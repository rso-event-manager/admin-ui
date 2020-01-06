<template>
    <div>
        <p class="mb-0 caption grey--text">
            {{ (new Date(cEvent.startDate)).toLocaleDateString() }} ob
            {{ getTime(cEvent.startDate) }}
            <span v-if="cEvent.venue && cEvent.venue.name">/ {{ cEvent.venue.name }}</span>
            <span v-else-if="cEvent.venue && venues">/ {{ venues.find(v => v._id === cEvent.venue).name }}</span>
        </p>

        <span class="mr-3">{{ cEvent.name }}</span>

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
    </div>
</template>

<script>
	import EventDialog from "./EventDialog";
	export default {
		name: "EventCard",
		components: {EventDialog},
		props: [ "event", "venues" ],
		data() {
			return {
				dialog: false,
                cEvent: this.event,
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