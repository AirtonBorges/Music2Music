<template>
  <v-sheet height="100vh" width="100vw" class="d-flex justify-center align-center">
    <v-card class="mx-auto px-6 py-8" width="400px" height="fit-content">
      <v-form width="100vw" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="linkMusica"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Link da música"
        ></v-text-field>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
  import { RetornoMusicApi, RetornoMusicApiSearch } from "./interfaces/retorno-music-api";

  export default {
    data: () => ({
      form: false,
      email: null,
      linkMusica: null,
      loading: false,
    }),
    methods: {
      async onSubmit() {
        if (!this.form) return;

        this.loading = true;

        const url = 'https://musicapi13.p.rapidapi.com/public/inspect/url';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'musicapi13.p.rapidapi.com'
          },
          body: JSON.stringify({
            url: this.linkMusica
          })
        };

        let data = null;
        try {
          const response = (await fetch(url, options)).json();
          data = (await response).data as RetornoMusicApi;
          console.log(data);
        } catch (error) {
          console.error(error);
        }

        const urlSearch = 'https://musicapi13.p.rapidapi.com/public/search';
        const optionsSearch = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'musicapi13.p.rapidapi.com'
          },
          body: JSON.stringify({
            track: data?.name,
            artist: data?.artistNames[0],
            type: 'track',
            sources: ['spotify']
          })
        };


        try {
          const response = await (await fetch(urlSearch, optionsSearch)).json();
          const data = (await response) as { tracks: RetornoMusicApiSearch[] };
          window.open(data.tracks[0].data.url);
        } catch (error) {
          console.error(error);
        }
        setTimeout(() => (this.loading = false), 2000)
      },
      required(v) {
        return !!v || 'Digita o link da musica pls'
      },
    },
  }
</script>
