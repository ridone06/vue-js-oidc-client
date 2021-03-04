<template>
  <div>
    <p>Signout SSO</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BackChannelLogout extends Vue {
  public async mounted() {
    try {
      var result = await this.$root.auth.logout();
      console.log("BackChannelLogout", result);
      debugger;
    } catch (e) {
      console.log("BackChannelLogout", e);
    }
  }
}
</script>