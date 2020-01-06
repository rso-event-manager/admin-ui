<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <div class="d-flex align-center">
                <span class="font-weight-black text-uppercase">Administracija dogodkov</span>
            </div>

            <v-spacer></v-spacer>

            <router-link to="/" tag="button" class="v-btn v-btn--flat v-btn--text theme--dark v-size--default">
                <v-icon>mdi-home</v-icon>
                <span class="ml-2">Domov</span>
            </router-link>

            <router-link to="/dogodki" tag="button" class="v-btn v-btn--flat v-btn--text theme--dark v-size--default">
                <v-icon>mdi-calendar</v-icon>
                <span class="ml-2">Dogodki</span>
            </router-link>

            <router-link to="/dvorane" tag="button" class="v-btn v-btn--flat v-btn--text theme--dark v-size--default">
                <v-icon>mdi-theater</v-icon>
                <span class="ml-2">Dvorane</span>
            </router-link>

            <v-btn text>
                <v-icon>mdi-face</v-icon>
                <span class="ml-2">Obiskovalci</span>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
	// import Dashboard from './components/HelloWorld';

	export default {
		name: 'App',

		components: {
			// Dashboard,
		},

		data: () => ({
			//
		}),
	};
</script>
