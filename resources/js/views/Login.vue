<template>
    <b-container>
        <b-row>
            <b-col>
                <div class="mt-n5">
                    <div class="text-center">
                        <b-icon-book font-scale="5" class="mb-2"></b-icon-book>
                        <h3 class="mb-4">Log in to your account.</h3>
                    </div>
                    <ValidationObserver ref="observer" v-slot="{ passes }">
                        <b-form @submit.prevent="passes(onSubmit)" class="login-form">
                            <div class="form-label-group">
                                <ValidationProvider rules="required|email" v-slot="{ valid, errors }">
                                    <b-form-input class="mb-3 py-4"
                                                  id="email"
                                                  v-model="email"
                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                  type="text"
                                                  placeholder=" ">
                                    </b-form-input>
                                    <label>Email</label>
                                    <b-form-invalid-feedback id="inputLiveFeedback" class="mt-n2 mb-2">
                                        {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                </ValidationProvider>
                            </div>
                            <div class="form-label-group">
                                <ValidationProvider rules="required" v-slot="{ valid, errors }">
                                    <b-form-input class="mb-3 py-4"
                                                  id="password"
                                                  v-model="password"
                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                  type="password"
                                                  placeholder=" ">
                                    </b-form-input>
                                    <label>Password</label>
                                    <b-form-invalid-feedback id="inputLiveFeedback" class="mt-n2 mb-2">
                                        {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                </ValidationProvider>
                            </div>

                            <b-button type="submit" variant="dark" size="lg" class="w-100">
                                Log In
                            </b-button>

                            <p class="my-2">Don't have an account?
                                <b-link to="register">Register</b-link>
                            </p>
                        </b-form>
                    </ValidationObserver>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import Landing from "../layouts/Landing";

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        created() {
            this.$emit("update:layout", Landing);
        },
        methods: {
            onSubmit() {

            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/form.css";

    .login-form {
        max-width: 420px;
        width: 100%;
        margin: auto;
        padding: 15px;
    }
</style>
