<template>
    <v-container mt-12>
        <v-row>
            <v-col cols="12">
                <v-flex d-flex align-center>
                    <h1 class="display-1 font-weight-bold mr-10">
                        Aktualni dogodki
                    </h1>

                    <v-dialog v-model="newEventDialog" max-width="700px">
                        <template v-slot:activator="{ on }">
                            <v-btn outlined depressed small color="primary" v-on="on">
                                Dodaj nov dogodek
                            </v-btn>
                        </template>
                        <EventDialog
                                :newEvent="true"
                                :venues="venues"
                                title="Ustvari nov dogodek"
                                @changeDialog="newEventDialog = $event"
                                @createdEvent="handleNewEvent"
                        ></EventDialog>
                    </v-dialog>
                </v-flex>
            </v-col>
        </v-row>

        <v-row class="mb-12">
            <v-col cols="4">
                <DashboardEventList :events="eventsYesterday" :date="yesterday" :venues="venues"></DashboardEventList>
            </v-col>
            <v-col cols="4">
                <DashboardEventList :events="eventsToday" :date="today" :venues="venues"></DashboardEventList>
            </v-col>
            <v-col cols="4">
                <DashboardEventList :events="eventsTomorrow" :date="tomorrow" :venues="venues"></DashboardEventList>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-flex mb-0 d-flex align-center>
                    <h1 class="display-1 font-weight-bold mr-10">
                        Dvorane
                    </h1>

                    <v-dialog v-model="newVenueDialog" max-width="700px">
                        <template v-slot:activator="{ on }">
                            <v-btn outlined depressed small color="primary" v-on="on">
                                Dodaj novo dvorano
                            </v-btn>
                        </template>

                        <VenueDialog
                                :newVenue="true"
                                title="Dodaj novo dvorano"
                                @changeDialog="newVenueDialog = $event"
                                @createdVenue="venues.push($event)"
                        ></VenueDialog>
                    </v-dialog>
                </v-flex>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4" v-for="venue in venues" :key="venue._id">
                <VenueCard :venue="venue" @deletedVenue="venues = venues.filter(v => v._id !== $event)"></VenueCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	import DashboardEventList from "./DashbordEventList";
	import EventDialog from "./EventDialog";
	import VenueCard from "./VenueCard";
	import VenueDialog from "./VenueDialog";

	const axios = require('axios')

	export default {
		name: 'Dashboard',
		components: {VenueDialog, VenueCard, EventDialog, DashboardEventList},
		data: () => ({
			today: new Date(),
			eventsYesterday: [],
			eventsToday: [],
			eventsTomorrow: [],
			venues: [],
			newEventDialog: false,
			newVenueDialog: false,
		}),
		methods: {
			handleNewEvent: function (event) {
				const d = new Date(event.startDate);

				const dYear = d.getFullYear()
				const dMonth = d.getMonth()
				const dDate = d.getDate()

				const today = new Date()
				if (today.getDate() === dDate && today.getMonth() === dMonth && today.getFullYear() === dYear) {
					this.eventsToday.push(event)
					return
				}

				const yesterday = new Date()
				yesterday.setDate(yesterday.getDate() - 1)
				if (yesterday.getDate() === dDate && yesterday.getMonth() === dMonth && yesterday.getFullYear() === dYear) {
					this.eventsYesterday.push(event)
					return
				}

				const tomorrow = new Date()
				tomorrow.setDate(tomorrow.getDate() + 1)
				if (tomorrow.getDate() === dDate && tomorrow.getMonth() === dMonth && tomorrow.getFullYear() === dYear) {
					this.eventsTomorrow.push(event)
					return
				}
			}
		},
		computed: {
			yesterday: () => {
				const yesterday = new Date()
				yesterday.setDate(yesterday.getDate() - 1)
				return yesterday
			},
			tomorrow: () => {
				const tomorrow = new Date()
				tomorrow.setDate(tomorrow.getDate() + 1)
				return tomorrow
			},
		},
		mounted() {
            axios
				.get(`${process.env.VUE_APP_API}/events?startDate=${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`)
				.then(response => {
					if (response && response.data) {
						this.eventsToday = response.data
					}
				})

			axios
				.get(`${process.env.VUE_APP_API}/events?startDate=${this.yesterday.getFullYear()}-${this.yesterday.getMonth() + 1}-${this.yesterday.getDate()}`)
				.then(response => {
					if (response && response.data) {
						this.eventsYesterday = response.data
					}
				})

			axios
				.get(`${process.env.VUE_APP_API}/events?startDate=${this.tomorrow.getFullYear()}-${this.tomorrow.getMonth() + 1}-${this.tomorrow.getDate()}`)
				.then(response => {
					if (response && response.data) {
						this.eventsTomorrow = response.data
					}
				})

			axios
				.post(`${process.env.VUE_APP_API}/venues`, {
					"query": `{
                        venues {
                            _id
                            name
                            capacity
                            description
                        }
                    }`
				})
				.then(response => {
					if (response && response.data && response.data.data && response.data.data.venues) {
						this.venues = response.data.data.venues
					}
				})
		}
	};
</script>
