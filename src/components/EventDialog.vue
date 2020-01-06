<template>
    <v-card class="py-3">
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-form v-on:submit.prevent="submit">
            <v-card-text class="pt-0">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                    v-model="updatableEvent.name"
                                    label="Ime dogodka"
                                    required
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <DatePicker :date="formatDate(updatableEvent.startDate)"
                                        label="Izberi datum začetka"
                                        @changedDate="updateDate($event, 'startDate')"></DatePicker>
                        </v-col>
                        <v-col cols="6">
                            <TimePicker :time="getTime(updatableEvent.startDate)"
                                        label="Izberi uro začetka"
                                        @changedTime="updateTime($event, 'startDate')"></TimePicker>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <DatePicker :date="formatDate(updatableEvent.endDate)"
                                        label="Izberi datum zaključka"
                                        @changedDate="updateDate($event, 'endDate')"></DatePicker>
                        </v-col>
                        <v-col cols="6">
                            <TimePicker :time="getTime(updatableEvent.endDate)"
                                        label="Izberi uro zaključka"
                                        @changedTime="updateTime($event, 'endDate')"></TimePicker>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field type="number" v-model="updatableEvent.numberOfTickets"
                                          label="Število kart"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field type="number" v-model="updatableEvent.price"
                                          label="Cena karte"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-select
                                    :items="venues"
                                    label="Izberi dvorano"
                                    v-model="venue"
                                    item-text="name"
                                    return-object
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-btn text @click="$emit('changeDialog', false)">Zapri</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="green" class="mr-3" @click="$emit('changeDialog', false)">
                    {{ newEvent ? 'Ustvari nov dogodek' : 'Posodobi' }}
                </v-btn>
                <v-btn color="red" @click="deleteEvent" v-if="!newEvent">Izbriši</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
	const axios = require('axios')

	import DatePicker from "./DatePicker";
	import TimePicker from "./TimePicker";

	export default {
		name: "EventDialog",
		components: {TimePicker, DatePicker},
		props: ['event', 'venues', 'title', 'newEvent'],
		data() {
			return {
				updatableEvent: this.event ? this.event : { name: '', startDate: (new Date()).toISOString(), endDate: (new Date()).toISOString() },
				venue: (this.event && this.event.venue) ? this.event.venue : '',
			}
		},
		methods: {
			getTime: (date) => {
				if (date) {
					date = new Date(date)
					return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
				}
			},
            submit: function() {
                // eslint-disable-next-line no-console
				if (this.newEvent) {
					this.createEvent()
                } else {
					this.update()
                }
            },
			update: function () {
				const vm = this
				axios.patch(`http://51.124.10.15/events/event/${this.event._id}`, this.updatableEvent)
					.then(res => {
						if (res && res.data) {
							vm.updatableEvent = res.data
							this.$emit('updatedEvent', res.data)
						}
					})
			},
			createEvent: function () {
				const vm = this
				axios.post(`http://51.124.10.15/events/event`, this.updatableEvent)
					.then(res => {
						if (res && res.data) {
							vm.updatableEvent = res.data
							this.$emit('createdEvent', res.data)
						}
					})
			},
			formatDate: function (date) {
				const d = new Date(date)
				return `${d.getFullYear()}-${d.getMonth() < 9 ? '0' : ''}${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`
			},
			updateTime: function (value, field) {
				const regex = /(.*):(.*)/
				const m = regex.exec(value)
				const d = new Date(this.updatableEvent[field])
				d.setHours(m[1])
				d.setMinutes(m[2])
				this.updatableEvent[field] = d.toISOString()
			},
			updateDate: function (value, field) {
				const newDate = new Date(value)
				const d = new Date(this.updatableEvent[field])
				d.setFullYear(newDate.getFullYear())
				d.setMonth(newDate.getMonth())
				d.setDate(newDate.getDate())
				this.updatableEvent[field] = d.toISOString()
			},
			deleteEvent: function () {
				this.$emit('changeDialog', false)

				axios.delete(`http://51.124.10.15/events/event/${this.event._id}`)
					.then(() => {
						this.$emit('deletedEvent', this.event._id)
					})
			},
		},
		watch: {
			venue: function () {
				this.updatableEvent.venue = this.venue._id
			},
		}
	}
</script>

<style scoped>

</style>