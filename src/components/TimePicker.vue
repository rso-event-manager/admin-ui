<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="cTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="cTime"
                    :label="label"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-time-picker
                v-if="menu"
                v-model="cTime"
                full-width
                @change="$emit('changedTime', cTime)"
        >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Zapri</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(cTime)">Potrdi</v-btn>
        </v-time-picker>
    </v-menu>
</template>

<script>
	export default {
		name: "TimePicker",
        props: ["time", "label"],
		data() {
			return {
				cTime: this.time,
                menu: false,
			}
		},
        watch: {
			time: function () {
				// eslint-disable-next-line no-console
				this.cTime = this.time
			}
        }
	}
</script>

<style scoped>

</style>