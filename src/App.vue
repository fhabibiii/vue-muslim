<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from './services/api'
import Cookies from 'js-cookie'
import iziToast from 'izitoast'

const router = useRouter()

//state userRegister
const userRegister = reactive({
    name: '',
    email: '',
    password: '',
})

//state userLogin
const userLogin = reactive({
    email: '',
    password: '',
})

//state validation
const validation = ref([])
const loginFailed = ref([])

//state isLoggedIn
const isLoggedIn = ref(Cookies.get('token') ? true : false)

//state for selected city and prayer times
const selectedCity = ref(Cookies.get('selectedCity') || '')
const prayerTimes = ref(null)

//references to modals
const registerModal = ref(null)
const loginModal = ref(null)

//method to show toast
const showToast = (message, type) => {
    iziToast.show({
        title: type === 'success' ? 'Success' : 'Error',
        message: message,
        color: type === 'success' ? 'green' : 'red',
        position: 'topRight',
        timeout: 3000
    });
}

const fetchPrayerTimes = async (showToastMessages = true) => {
    try {
        const params = {
            city: selectedCity.value,
            country: 'indonesia',
        };
        const headers = {};
        if (isLoggedIn.value) {
            headers.Authorization = `${Cookies.get('token')}`;
        }
        const response = await api.get('/api/prayertime', { params, headers });
        prayerTimes.value = response.data.data;
        if (showToastMessages) {
            showToast('Prayer times retrieved successfully!', 'success');
        }
    } catch (error) {
        if (showToastMessages) {
            showToast('Failed to retrieve prayer times!', 'danger');
        }
    }
};

//method register
const register = async () => {
    //call api register
    await api.post('/api/register', {
        name: userRegister.name,
        email: userRegister.email,
        password: userRegister.password,
    })
    .then(() => {
        showToast('Registration successful!', 'success')
        // Close the register modal
        const modal = bootstrap.Modal.getInstance(registerModal.value)
        modal.hide()
        router.push({
            name: 'home'
        })
    })
    .catch(error => {
        //assign validation value with error
        validation.value = error.response.data
        showToast('Registration failed!', 'danger')
    })
}

//method login
const login = async () => {
    await api.post('/api/login', {
        email: userLogin.email,
        password: userLogin.password,
    })
        .then((response) => {
            Cookies.set('token', response.data.data.token);
            Cookies.set('user', JSON.stringify(response.data.data.user));
            isLoggedIn.value = true;

            // Set `selectedCity` dari user data atau biarkan kosong untuk default
            const user = response.data.data.user;
            selectedCity.value = user.city || '';
            Cookies.set('selectedCity', selectedCity.value);

            showToast('Login successful!', 'success');
            const modal = bootstrap.Modal.getInstance(loginModal.value);
            modal.hide();
            router.push({ name: 'home' });
        })
        .catch((error) => {
            validation.value = error.response.data;
            loginFailed.value = error.response.data;
            showToast('Login failed!', 'danger');
        });
};

//method logout
const logout = () => {
    //remove token and user from cookies
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('selectedCity')

    // Update isLoggedIn state
    isLoggedIn.value = false

    // Show logout success toast
    showToast('Logout successful!', 'success')

    // Redirect to home
    router.push({ name: 'home' })
}

// Watch for changes in selectedCity and fetch prayer times
watch(selectedCity, (newCity) => {
    if (newCity) {
        fetchPrayerTimes(true);
        Cookies.set('selectedCity', newCity);
    }
});

// Fetch prayer times on mount if logged in
onMounted(() => {
    if (isLoggedIn.value) {
        const user = JSON.parse(Cookies.get('user'));
        selectedCity.value = Cookies.get('selectedCity') || user.city || 'Jakarta';
    } else {
        selectedCity.value = 'Jakarta';
    }
    fetchPrayerTimes(false); // Panggil fetchPrayerTimes saat komponen dimuat
});
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <!-- Bagian Kiri -->
        <a class="navbar-brand" href="#">
          <img src="/assets/logo.png" alt="logo" width="50" height="auto">
        </a>

        <!-- Tombol Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Konten Navbar -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Konten di sisi kanan -->
          <div class="ms-auto d-flex align-items-center">
            <select v-model="selectedCity" class="form-select me-2" aria-label="Pilih Kota/Kabupaten">
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
            <template v-if="isLoggedIn">
              <button type="button" class="btn btn-outline-danger me-2" @click="logout">LOGOUT</button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#register">REGISTER</button>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">LOGIN</button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Modal Register -->
    <div class="modal fade" id="register" tabindex="-1" aria-labelledby="register" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="register">REGISTER</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="register">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <div class="form-group">
                            <label class="mb-1 fw-bold">Full Name</label>
                            <input type="text" v-model="userRegister.name" class="form-control"
                                placeholder="Full Name" />
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <div class="form-group">
                            <label class="mb-1 fw-bold">Email address</label>
                            <input type="email" v-model="userRegister.email" class="form-control"
                                placeholder="Email Address" />
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <div class="form-group">
                            <label class="mb-1 fw-bold">Password</label>
                            <input type="password" v-model="userRegister.password" class="form-control"
                                placeholder="Password" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">REGISTER</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Login -->
    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="login" aria-hidden="true" ref="loginModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="login">LOGIN</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login">
                <div class="form-group mb-3">
                    <label class="mb-1 fw-bold">Email address</label>
                    <input type="email" v-model="userLogin.email" class="form-control" placeholder="Email Address" />
                </div>

                <div class="form-group mb-3">
                    <label class="mb-1 fw-bold">Password</label>
                    <input type="password" v-model="userLogin.password" class="form-control"
                        placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary">LOGIN</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!--- render router view -->
    <div class="mt-5">
      <router-view :prayer-times="prayerTimes"></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cities: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta", "Sragen", "Semarang", "Solo", "Bali", "Lombok", "Nabire", "Makassar"],
      selectedCity: "",
    };
  },
};
</script>

<style>
</style>