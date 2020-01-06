<template>
    <v-container mt-12>
        <v-row>
            <v-col cols="12">
                <v-flex mb-0 d-flex align-center>
                    <h1 class="display-1 font-weight-bold mr-10">
                        Vse dvorane
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
	import VenueCard from "./VenueCard";
	import VenueDialog from "./VenueDialog";

	const axios = require('axios')

	export default {
		name: 'Venues',
		components: {VenueDialog, VenueCard},
		data: () => ({
			venues: [],
			newVenueDialog: false,
		}),
		mounted() {
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
