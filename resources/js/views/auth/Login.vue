<template>
    <div class="max-w-md w-full">
        <div>
            <Education class="mx-auto w-16 h-16 fill-current text-iris"/>
            <h3 class="mt-6 text-center text-2xl font-semibold text-gray-900">
                Sign in to your account
            </h3>
            <p class="mt-2 text-center text-sm leading-5">
                Or
                <router-link to="register"
                             class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    create an account
                </router-link>
            </p>
        </div>
        <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed}">
            <form @submit.prevent="passes(login)" class="mt-8">
                <div>
                    <ValidationProvider rules="required|email" v-slot="{ valid, errors }">
                        <div class="mb-4">
                            <div class="relative">
                                <input v-model="email" id="email"
                                       class="form-input block w-full pl-3 pr-8 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                       placeholder="Email"/>
                                <Check v-show="valid"
                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-green-400"/>
                                <Cross v-show="errors[0]"
                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-red-400"/>
                            </div>
                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                {{errors[0]}}</p>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ valid, errors }">
                        <div class="mb-4">
                            <div class="relative">
                                <input v-model="password" id="password" type="password"
                                       class="form-input block w-full pl-3 pr-8 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                       placeholder="Password"/>
                                <Check v-show="valid"
                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-green-400"/>
                                <Cross v-show="errors[0]"
                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-red-400"/>
                            </div>
                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                {{errors[0]}}</p>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember_me" type="checkbox"
                               class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                        <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div class="text-sm leading-5">
                        <a href="#"
                           class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <div class="mt-8">
                    <button type="submit"
                            class="inline-flex bg-gray-400 select-none justify-center w-full rounded-md border border-transparent px-4 py-3 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            :class="[!invalid && changed ? enabledClass : '']"
                            :disabled="invalid">
                        <TailSpin v-if="isLoggingIn" class="w-6 h-6 mx-auto"/>
                        <span v-else class="block leading-relaxed w-full h-6">Sign In</span>
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import {mapGetters} from "vuex";
    import Full from "@/layouts/Full";
    import Education from "@/assets/svg/Education";
    import Check from "@/assets/svg/Check";
    import Cross from "@/assets/svg/Cross";
    import TailSpin from "@/assets/svg/TailSpin";

    export default {
        name: "Login",
        data() {
            return {
                validClass: 'valid',
                errorClass: 'error',
                enabledClass: 'enabled'
            }
        },
        components: {
            ValidationObserver,
            ValidationProvider,
            Education,
            Check,
            Cross,
            TailSpin
        },
        created() {
            this.$emit("update:layout", Full);
            this.$store.commit('auth/RESET_LOGIN');
        },
        computed: {
            email: {
                get() {
                    return this.$store.state.auth.email;
                },
                set(val) {
                    this.$store.commit('auth/SET_EMAIL', val);
                }
            },
            password: {
                get() {
                    return this.$store.state.auth.password;
                },
                set(val) {
                    this.$store.commit('auth/SET_PASSWORD', val);
                }
            },
            ...mapGetters('auth', [
                'isLoggingIn'
            ])
        },
        methods: {
            login() {
                this.$store.dispatch('auth/login')
                    .then(() => {
                        this.$router.push('/home');
                    }).catch(e => {
                })
            }
        }

    }
</script>

<style src="@/assets/css/form.css" scoped>
</style>
