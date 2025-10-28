<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type LoginPayloadRequest } from '@/stores/authStore'
import CurveDevider from '@/components/ui/CurveDevider.vue'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref()
const valid = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)
const focusedField = ref<string | null>(null)

const credentials = ref({
  user_name: '',
  password: ''
})

const alert = reactive({
  show: false,
  type: 'error' as 'error' | 'success' | 'warning' | 'info',
  message: ''
})

const usernameRules = [
  (v: string) => !!v || 'Username is required',
  (v: string) => v.length >= 3 || 'Username must be at least 3 characters'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 3 || 'Password must be at least 3 characters'
]

const showAlert = (type: typeof alert.type, message: string) => {
  alert.type = type
  alert.message = message
  alert.show = true

  setTimeout(() => {
    alert.show = false
  }, 5000)
}

const handleLogin = async () => {
  const { valid: isValid } = await formRef.value.validate()

  if (!isValid) return

  const payload: LoginPayloadRequest = {
    user_name: credentials.value.user_name,
    password: credentials.value.password
  }

  try {
    const response = await authStore.login(payload)

    if (response && authStore.isAuthenticated) {
      showAlert('success', 'Login successful! Redirecting...')

      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      showAlert('error', 'Invalid username or password. Please try again.')
    }
  } catch (error) {
    showAlert('error', 'An error occurred during login. Please try again.')
    console.error('Login error:', error)
  }
}

const handleForgotPassword = () => {
  showAlert('info', 'Password reset functionality coming soon!')
}

const handleSignUp = () => {
  router.push('/signup')
}

const handleSocialLogin = (provider: string) => {
  showAlert('info', `${provider} login coming soon!`)
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-black relative overflow-hidden">
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
    </div>

    <!-- Login Card Container -->
    <div class="flex-1 flex items-center justify-center p-4 pb-20">
      <div class="w-full max-w-md relative z-10">
      <!-- Alert positioned above card -->
      <!-- <transition name="slide-down">
        <v-alert 
          v-if="alert.show" 
          :type="alert.type" 
          :text="alert.message" 
          class="mb-4 shadow-lg"
          closable
          @click:close="alert.show = false" 
          density="comfortable" 
          variant="tonal"
          rounded="lg">
        </v-alert>
      </transition> -->

      <!-- Main Card with Glass Effect -->
      <div class="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden transform transition-all hover:shadow-blue-500/10 hover:shadow-3xl">
        
        <!-- Card Content -->
        <div class="p-6 md:p-8">
          
          <!-- Logo/Header Section -->
          <div class="text-center mb-6 space-y-3">
            <div class="inline-block transform transition-transform hover:scale-105">
              <img src="/images/site/logo.png" alt="site-logo" class="w-[60%] mx-auto drop-shadow-2xl">
            </div>
            <!-- <div class="space-y-1">
              <h1 class="text-xl font-bold text-white tracking-tight">Welcome Back</h1>
              <p class="text-gray-400 text-xs">Enter your credentials to access your account</p>
            </div> -->
          </div>

          <!-- Login Form -->
          <v-form ref="formRef" v-model="valid" @submit.prevent="handleLogin">
            <div class="space-y-4">
              <!-- Username Field -->
              <div class="relative group">
                <v-text-field 
                  v-model="credentials.user_name" 
                  label="Username" 
                  placeholder="Enter your username"
                  :rules="usernameRules" 
                  :disabled="authStore.loading" 
                  variant="outlined" 
                  color="blue"
                  base-color="white"
                  prepend-inner-icon="mdi-account-outline" 
                  density="comfortable"
                  class="login-field"
                  rounded="lg"
                  @focus="focusedField = 'username'"
                  @blur="focusedField = null"
                  @keyup.enter="handleLogin" 
                  @input="credentials.user_name = credentials.user_name.toUpperCase()" />
                <div 
                  class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 blur-xl"
                  :class="{ 'opacity-100': focusedField === 'username' }">
                </div>
              </div>

              <!-- Password Field -->
              <div class="relative group">
                <v-text-field 
                  v-model="credentials.password" 
                  :type="showPassword ? 'text' : 'password'" 
                  label="Password"
                  placeholder="Enter your password" 
                  :rules="passwordRules" 
                  :disabled="authStore.loading"
                  variant="outlined" 
                  color="blue"
                  base-color="white"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword" 
                  density="comfortable"
                  class="login-field"
                  rounded="lg"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null"
                  @keyup.enter="handleLogin" />
                <div 
                  class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 blur-xl"
                  :class="{ 'opacity-100': focusedField === 'password' }">
                </div>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    v-model="rememberMe"
                    class="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer">
                  <span class="text-gray-300 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <button 
                  type="button"
                  @click="handleForgotPassword"
                  class="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>

              <!-- Login Button -->
              <v-btn 
                type="submit" 
                :loading="authStore.loading" 
                :disabled="!valid || authStore.loading" 
                block
                size="large" 
                class="font-semibold mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                rounded="lg"
                variant="outlined"
                elevation="0">
                <span class="flex items-center gap-2">
                  <span>Sign In</span>
                  <v-icon>mdi-arrow-right</v-icon>
                </span>
              </v-btn>

              <!-- Divider -->
              <div class="relative my-5">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-white/10"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                  <span class="px-4 bg-transparent text-gray-400">Or continue with</span>
                </div>
              </div>

              <!-- Social Login Buttons -->
              <div class="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  @click="handleSocialLogin('Google')"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:scale-105 active:scale-95 group">
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-gray-300 group-hover:text-white text-sm font-medium">Google</span>
                </button>

                <button 
                  type="button"
                  @click="handleSocialLogin('GitHub')"
                  class="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:scale-105 active:scale-95 group">
                  <svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span class="text-gray-300 group-hover:text-white text-sm font-medium">GitHub</span>
                </button>
              </div>

              <!-- Sign Up Link -->
              <div class="text-center mt-4">
                <p class="text-gray-400 text-xs">
                  Don't have an account?
                  <button 
                    type="button"
                    @click="handleSignUp"
                    class="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1">
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </v-form>
        </div>
      </div>

      <!-- Footer Text -->
      <p class="text-center text-gray-500 text-xs mt-4">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
    </div>

    <!-- Fixed CurveDevider at bottom -->
    <div class="fixed bottom-0 left-0 right-0 z-0">
      <CurveDevider />
    </div>
  </div>
</template>

<style scoped>
/* Animations */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Alert Transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom Input Styling */
:deep(.login-field .v-field) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

:deep(.login-field .v-field:hover) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(96, 165, 250, 0.3);
}

:deep(.login-field .v-field--focused) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgb(96, 165, 250);
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1);
}

:deep(.login-field .v-label) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.login-field .v-field__input) {
  color: white;
}

:deep(.login-field .v-icon) {
  color: rgba(255, 255, 255, 0.5);
}

:deep(.login-field .v-field--focused .v-icon) {
  color: rgb(96, 165, 250);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Custom checkbox styling */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: rgb(59, 130, 246);
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  border-color: rgb(59, 130, 246);
}
</style>