import axios from "axios";
import { LOCAL_URL, LOCAL_URL, configHeader } from "./configApi";

class UserApi {
  async register(data) {
    try {
      const res = await axios.post(`${LOCAL_URL}/auth/signup`, data);

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async login(data) {
    try {
      const res = await axios.post(`${LOCAL_URL}/auth/login`, data);

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async loginSuccess({ token, clientId }) {
    try {
      const res = await axios.post(
        `${LOCAL_URL}/auth/login-success`,
        {},
        {
          headers: configHeader({ token, clientId }),
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async logout({ token, clientId }) {
    try {
      const res = await axios.post(
        `${LOCAL_URL}/auth/logout`,
        {},
        {
          headers: configHeader({ token, clientId }),
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async updateInfo({ token, clientId }, data) {
    try {
      const res = await axios.patch(`${LOCAL_URL}/user`, data, {
        headers: configHeader({ token, clientId }),
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async updateStaffInfo({ token, clientId }, data) {
    try {
      const res = await axios.patch(`${LOCAL_URL}/staff`, data, {
        headers: configHeader({ token, clientId }),
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async getStaffList({ token, clientId }) {
    try {
      const res = await axios.get(`${LOCAL_URL}/staffs`, {
        headers: configHeader({ token, clientId }),
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
        data: [],
      };
    }
  }

  async deleteStaff({ token, clientId }, staffId) {
    try {
      const res = await axios.delete(`${LOCAL_URL}/staff/${staffId}`, {
        headers: configHeader({ token, clientId }),
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async createStaff({ token, clientId }, password, email, name, attributes) {
    try {
      const res = await axios.post(
        `${LOCAL_URL}/auth/signup/employee`,
        {
          password: password,
          email: email,
          name: name,
          attributes: attributes,
        },
        {
          headers: configHeader({ token, clientId }),
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
      };
    }
  }

  async getUserInfo({ token, clientId }, id) {
    try {
      const res = await axios.get(`${LOCAL_URL}/user/${id}`, {
        headers: configHeader({ token, clientId }),
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        response: error?.response,
        data: [],
      };
    }
  }
}

export default new UserApi();
