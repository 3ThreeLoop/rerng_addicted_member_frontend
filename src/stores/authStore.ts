import { defineStore } from 'pinia'
import { sonnerToast } from '@/utils/util'
import axios from 'axios'

export interface LoginPayloadRequest {
    user_name: string,
    password: string,
}

interface AuthStates {
  token: string | null,
  message: string,
  loading: boolean,
  isLogout: boolean
}

const baseUrl = import.meta.env.VITE_BASE_URL;
export const useAuthStore = defineStore('auth', {
  state: (): AuthStates => ({
    token: localStorage.getItem('authToken'),
    message: '',
    loading: false,
    isLogout: true,
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
  },

  actions: {
    async login(payload: LoginPayloadRequest) {
      this.loading = true;
      this.message = '';
      try {
        const response = await axios.post(baseUrl + '/admin/auth/login', payload, {
          headers: {
            'Accept-Language': 'en',
          },
        });
        const tokenResponse = response.data.data.auth.token;
        const messageResponse = response.data.message;
        this.token = tokenResponse;
        this.message = messageResponse;

        if (tokenResponse) {
          localStorage.setItem('authToken', tokenResponse);
          this.isLogout = false;
        } else {
          this.token = null;
          localStorage.removeItem('authToken');
          this.message = messageResponse || 'Login failed. Please try again.';
        }
        sonnerToast('',this.message , 'success');
        return response;
      } catch (error) {
        console.error('Login failed:', error);
        this.message = 'An error occurred during login. Please try again later.';
        this.token = null;
        localStorage.removeItem('authToken');
        sonnerToast('',this.message , 'error');
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.isLogout = true;
      this.message = 'Logged out successfully.';
      localStorage.removeItem('authToken');
    },
  },
});
