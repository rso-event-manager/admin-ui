<template>
    <v-container mt-12>
        <v-row>
            <v-col cols="12">
                <v-flex d-flex align-center>
                    <h1 class="display-1 font-weight-bold mr-10">
                        Vsi dogodki
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

        <v-row class="mb-10">
            <v-col cols="4" v-for="event in events" :key="event._id">
                <EventCard
                        :venues="venues"
                        :event="event"
                        @deletedEvent="events = events.filter(e => e._id !== $event)"
                ></EventCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	import EventDialog from "./EventDialog";
	import EventCard from "./EventCard";

	const axios = require('axios')

	export default {
		name: 'Dashboard',
		components: {EventCard, EventDialog},
		data: () => ({
            events: [],
			venues: [],
			newEventDialog: false,
		}),
		methods: {
			getTime: (date) => {
				if (date) {
					date = new Date(date)
					return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
				}
			},
			handleNewEvent: function (event) {
				this.events.push(event)
                this.events.sort((a, b) => (new Date(a.startDate)).getTime() > (new Date(b.startDate)).getTime() ? 1 : -1)
			}
		},
		mounted() {
			axios
				.get(`http://51.124.10.15/events`)
				.then(response => {
					if (response && response.data) {
						this.events = response.data
					}
				})

			axios
				.post(`http://51.124.10.15/venues`, {
					"query": `{
                        venues {
                            _id
                            name
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
