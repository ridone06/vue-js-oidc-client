<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="home">
      <p v-if="isLoggedIn">
        <strong>Usercode</strong>: {{ loginuser.user_code }}
      </p>
      <p v-if="isLoggedIn">
        <strong>Username</strong>: {{ loginuser.preferred_username }}
      </p>
      <p v-if="isLoggedIn"><strong>Nama</strong>: {{ loginuser.full_name }}</p>
      <p v-if="isLoggedIn"><strong>Email</strong>: {{ email }}</p>
      <button class="btn" @click="login" v-if="!isLoggedIn">Login</button>
      <button class="btn" @click="logout" v-if="isLoggedIn">Logout</button>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  public currentUser: any;
  public accessTokenExpired: boolean | undefined = false;
  public isLoggedIn: boolean = false;

  get loginuser(): any {
    return this.currentUser;
  }

  get email(): any {
    if (this.currentUser) {
      if (typeof this.currentUser.email === "object") {
        return this.currentUser.email[0];
      }

      return this.currentUser.email;
    }
    return "";
  }

  public login() {
    this.$root.auth.login();
  }

  public logout() {
    this.$root.auth.logout();
  }

  public mounted() {
    let user = this.$root.user;

    if (this.$root.user) {
      console.log("user", user);
      this.currentUser = user.profile;
      this.accessTokenExpired = user.expired;
      this.isLoggedIn = user !== null && !user.expired;
    }
  }
}
</script>
<style>
.btn {
  color: #42b983;
  font-weight: bold;
  background-color: #007bff;
  border-color: #007bff;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid #42b983;
  padding: 0.375rem 0.75rem;
  margin: 10px;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
