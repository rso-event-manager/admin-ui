<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="true"
            :return-value.sync="cDate"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="cDate"
                    :label="label"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                v-model="cDate"
                type="date"
                no-title
                scrollable
                @change="changeDate"
        >
        </v-date-picker>
    </v-menu>
</template>

<script>
	export default {
		name: "DatePicker",
		props: ['date', 'label'],
		data() {
			return {
				menu: false,
                cDate: this.date,
			}
		},
        watch: {
			date: function () {
				this.cDate = this.date
			}
		},
        methods: {
			changeDate: function () {
				this.$emit('changedDate', this.cDate)
                this.$refs.menu.save(this.cDate)
			}
        }
	}
</script>

<style scoped>

</style>