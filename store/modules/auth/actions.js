export default {
  async initializeLocal({ commit }) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      commit("setUser", user);
      commit("setUser", user);
      commit("setRole", user.role);
    }
  },
  async login({ commit }, userData) {
    window.localStorage.clear();
    let email = userData.email;
    let password = userData.password;

    try {
      if (!email || !password) {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Fill all details",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        return false;
      }
      let result = await fetch(`${process.env.API}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await result.json();
      if (res.success) {
        window.localStorage.setItem("user", JSON.stringify(res.user));
        const token = res.token;
        commit("setUser", res.user);
        commit("setToken", token);
        commit("setRole", res.user.role);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      } else {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async register({ commit }, registerData) {
    let name = registerData.name;
    let email = registerData.email;
    let password = registerData.password;
    let cpassword = registerData.confirmPassword;
    let agreement = registerData.agreement;
    try {
      let result = await fetch(`${process.env.API}/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password, cpassword, agreement }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await result.json();

      if (res.success) {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      } else {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async logout({ commit }) {
    commit("setUser", null);
    commit("setToken", null);
    commit("setRole", null);
    commit("setTotalLoanAmount", []);
    commit("setLoanDetails", []);
    commit("setRequestDate", []);
    commit("setScheduledRepayments", []);

    window.localStorage.clear();

    this.$swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logout Successfully",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
  },
};
