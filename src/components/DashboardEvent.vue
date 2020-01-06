<template>
    <div>
        <div class="py-6 px-10">
            <p class="mb-0 caption grey--text">
                {{ getTime(cEvent.startDate) }}
                <span v-if="cEvent.venue && cEvent.venue.name">/ {{ cEvent.venue.name }}</span>
                <span v-else-if="cEvent.venue && venues">/ {{ venues.find(v => v._id === cEvent.venue).name }}</span>
            </p>

            <p class="mb-0">
                <span class="mr-3">{{ this.cEvent.name }}</span>

                <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on }">
                        <v-btn text icon x-small v-on="on" color="grey darken-1">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>
                    <EventDialog
                            :event="cEvent"
                            :venues="venues"
                            title="Uredi dogodek"
                            @changeDialog="dialog = $event"
                            @updatedEvent="cEvent = $event"
                            @deletedEvent="$emit('deletedEvent', $event)">
                    </EventDialog>
                </v-dialog>
            </p>
        </div>
        <hr class="grey darken-2">
    </div>
</template>

<script>
	import EventDialog from "./EventDialog";

	export default {
		name: "DashboardEvent",
		components: {EventDialog},
		props: ["event", "venues"],
		data() {
			return {
				cEvent: this.event,
				dialog: false,
			}
		},
		methods: {
			getTime: (date) => {
				if (date) {
					date = new Date(date)
					return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
				}
			},
		},
	}
</script>

<style scoped>

</style>