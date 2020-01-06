<template>
    <v-card class="py-3">
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-form v-on:submit.prevent="submit">
            <v-card-text class="pt-0">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                    v-model="updatableVenue.name"
                                    label="Ime dvorane"
                                    required
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                    outlined
                                    :value="updatableVenue.description"
                                    label="Opis"
                                    v-model="updatableVenue.description"
                            ></v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field type="number" v-model="updatableVenue.capacity"
                                          label="Kapaciteta"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-btn text @click="$emit('changeDialog', false)">Zapri</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="green" class="mr-3" @click="$emit('changeDialog', false)">
                    {{ newVenue ? 'Ustvari nov dogodek' : 'Posodobi' }}
                </v-btn>
                <v-btn color="red" @click="deleteVenue" v-if="!newVenue">Izbriši</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
	import gql from 'graphql-tag'

	export default {
		name: "VenueDialog",
		props: ['venue', 'title', 'newVenue'],
		data() {
			return {
				updatableVenue: this.venue ? this.venue : {
					name: '',
					description: '',
				},
			}
		},
		methods: {
			submit: function () {
				if (this.newVenue) {
					this.createVenue()
				} else {
					this.update()
				}
			},
			update: async function () {
				if(this.updatableVenue.capacity) this.updatableVenue.capacity = parseInt(this.updatableVenue.capacity)

				await this.$apollo.mutate({
					mutation: gql`mutation ($input: VenueUpdateInput!) {
                        updateVenue(venueUpdateInput: $input) {
                            _id
                            name
                            description
                            capacity
                        }
                    }`,
					variables: {
						input: this.updatableVenue
					}
				})
			},
			createVenue: async function () {
				if(this.updatableVenue.capacity) this.updatableVenue.capacity = parseInt(this.updatableVenue.capacity)

				const result = await this.$apollo.mutate({
					mutation: gql`mutation ($input: VenueInput!) {
                        createVenue(venueInput: $input) {
                            _id
                            name
                            description
                            capacity
                        }
                    }`,
					variables: {
						input: this.updatableVenue
					}
				})

				this.$emit('createdVenue', result.data.createVenue)
			},
			deleteVenue: async function () {
				this.$emit('changeDialog', false)
				this.$emit('deletedVenue', this.updatableVenue._id)

				await this.$apollo.mutate({
					mutation: gql`mutation ($input: ID!) {
                        deleteVenue(_id: $input)
                    }`,
					variables: {
						input: this.updatableVenue._id
					}
				})
			},
		},
	}
</script>

<style scoped>

</style>