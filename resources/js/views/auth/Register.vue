<template>
    <div class="max-w-md w-full">
        <div>
            <Education class="mx-auto w-16 h-16 fill-current text-iris"/>
            <h3 class="mt-6 text-center text-2xl font-semibold text-gray-900">
                Create an account
            </h3>
            <p class="mt-2 text-center text-sm leading-5">
                Or
                <router-link to="login"
                             class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    sign in to your account
                </router-link>
            </p>
        </div>
        <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed}">
            <form @submit.prevent="passes(register)" class="mt-8">
                <div>
                    <ValidationProvider rules="required|min:3" v-slot="{ valid, errors }">
                        <div class="mb-4">
                            <div class="relative">
                                <input v-model="name" id="name"
                                       class="form-input block w-full pl-3 pr-8 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                       placeholder="Name"/>
                                <Check v-show="valid"
                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-green-400"/>
                                <Cross v-show="errors[0]"
                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-red-400"/>
                            </div>
                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                {{errors[0]}}</p>
                        </div>
                    </ValidationProvider>
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
                    <ValidationProvider rules="required|min:6" vid="confirm"
                                        v-slot="{ valid, errors }">
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
                    <ValidationProvider rules="required|confirmed:confirm" v-slot="{ valid, errors }">
                        <div class="mb-4">
                            <div class="relative">
                                <input v-model="confirm" id="confirm" type="password"
                                       class="form-input block w-full pl-3 pr-8 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                       placeholder="Confirm password"/>
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
                <div class="mt-8">
                    <button type="submit"
                            class="inline-flex bg-gray-400 select-none justify-center w-full rounded-md border border-transparent px-4 py-3 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            :class="[!invalid && changed ? enabledClass : '']"
                            :disabled="invalid">
                        <TailSpin v-if="isRegistering" class="w-6 h-6 mx-auto"/>
                        <span v-else class="block leading-relaxed w-full h-6">Register</span>
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
        name: "Register",
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
            this.$store.commit('auth/RESET_REGISTER');
        },
        computed: {
            name: {
                get() {
                    return this.$store.state.auth.name;
                },
                set(val) {
                    this.$store.commit('auth/SET_NAME', val);
                }
            },
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
            confirm: {
                get() {
                    return this.$store.state.auth.confirm;
                },
                set(val) {
                    this.$store.commit('auth/SET_CONFIRM', val);
                }
            },
            ...mapGetters('auth', ['isRegistering'])
        },
        methods: {
            register() {
                this.$store.dispatch('auth/register')
                    .then(() => {
                        this.$router.push('/');
                    }).catch(e => {
                })
            }
        }
    }
</script>

<style src="@/assets/css/form.css" scoped>
</style>
