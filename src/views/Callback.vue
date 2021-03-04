<template>
  <div>
    <p>Sign-in in progress</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Callback extends Vue {
  public async mounted() {
    try {
      var result = await this.$root.auth.signinRedirectCallback();
      var returnToUrl = "/";
      if (result.state !== undefined) {
        returnToUrl = result.state;
      }
      this.$router.push({ path: returnToUrl });
    } catch (e) {
      console.log(e);
      this.$router.push({ name: "Unauthorized" });
    }
  }
}
</script>