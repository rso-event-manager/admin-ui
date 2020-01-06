<template>
    <v-card color="grey darken-4">
        <v-card-title>
            {{ venue.name }}
        </v-card-title>
        <v-card-subtitle>
            Kapaciteta: {{ venue.capacity }}
        </v-card-subtitle>
        <v-card-text>
            {{ venue.description }}
        </v-card-text>
        <v-card-actions>
            <v-dialog v-model="venueEditDialog" max-width="700px">
                <template v-slot:activator="{ on }">
                    <v-btn text small v-on="on">Uredi</v-btn>
                </template>

                <VenueDialog
                        :venue="venue"
                        title="Uredi dvorano"
                        @createdVenue="$emit('createdVenue', $event)"
                        @changeDialog="venueEditDialog = $event"
                        @deletedVenue="$emit('deletedVenue', $event)"
                ></VenueDialog>
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
	import VenueDialog from "./VenueDialog";

	export default {
		name: "VenueCard",
        props: ['venue'],
        components: { VenueDialog },
		data() {
			return {
				venueEditDialog: false,
			}
		},
	}
</script>

<style scoped>

</style>