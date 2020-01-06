<template>
    <div style="height: 100%">
        <p class="mb-2 caption grey--text">
            {{ this.date.toLocaleDateString('sl-SI', { weekday: 'long' }) }},
            {{ this.date.getDate() }}. {{ this.date.getMonth() + 1 }}.
        </p>

        <div class="grey darken-4" style="height: 100%">
            <div v-if="this.cEvents && this.cEvents.length > 0">
                <div v-for="event in this.cEvents" :key="event._id">
                    <DashboardEvent :event="event"
                                    :venues="venues"
                                    @deletedEvent="cEvents = cEvents.filter(e => e._id !== $event)"></DashboardEvent>
                </div>
            </div>
            <div v-else class="text-center py-10" style="height: 100%">
                Ni dogodkov
            </div>

        </div>
    </div>
</template>

<script>
	import DashboardEvent from "./DashboardEvent";

	export default {
		name: 'DashboardEventList',
		components: {DashboardEvent},
		props: {
			date: {
				type: Date
			},
			events: {
				type: Array,
			},
			venues: {
				type: Array,
			},
		},
		data() {
			return {
				cEvents: this.events,
			}
		},
		watch: {
			events: function () {
				this.cEvents = this.events
			}
		}
	};
</script>