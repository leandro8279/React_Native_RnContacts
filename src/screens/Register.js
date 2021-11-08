import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useContext, useState } from "react";
import { Block, Button, Image, Text } from "rn-ui-kits";
import { Container, CustomButton, FromInput, Message } from "../components";
import { LOGIN } from "../constants/routesNames";
import register, { clearAuthState } from "../context/actions/auth/register";
import { GlobalContext } from "../context/Provider";
import colors from "../theme/colors";
export default function Register({ navigation }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {
    authDispatch,
    authState: { error, loading, data },
  } = useContext(GlobalContext);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error])
  );
  async function onSubmit() {
    if (!form.userName) {
      setErrors((prev) => {
        return { ...prev, userName: "Please add a username" };
      });
    }
    if (!form.firstName) {
      setErrors((prev) => {
        return { ...prev, firstName: "Please add a  first name" };
      });
    }
    if (!form.lastName) {
      setErrors((prev) => {
        return { ...prev, lastName: "Please add a last name" };
      });
    }
    if (!form.email) {
      setErrors((prev) => {
        return { ...prev, email: "Please add a email" };
      });
    }
    if (!form.password) {
      setErrors((prev) => {
        return { ...prev, password: "Please add a password" };
      });
    }

    if (
      Object.values(form).length === 5 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(errors).every((item) => !item)
    ) {
      register(form)(authDispatch)((response) => {
        navigation.navigate(LOGIN, { data: response });
      });
    }
  }
  function onChange({ name, value }) {
    setForm({ ...form, [name]: value });
    if (value !== "") {
      if (name === "password") {
        if (value.length < 6) {
          setErrors((prev) => {
            return { ...prev, [name]: "This field needs min 6 characters" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: null };
          });
        }
      } else {
        setErrors((prev) => {
          return { ...prev, [name]: null };
        });
      }
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  }
  return (
    <Container>
      <Image
        source={require("../assets/images/logo.png")}
        width={150}
        height={150}
        style={{
          marginTop: 50,
          alignSelf: "center",
        }}
      />
      <Block>
        <Text center size={21} paddingTop={20} weight="500">
          Welcome to RNContacts
        </Text>
        <Text center size={17} paddingVertical={20} weight="500">
          Create a free account
        </Text>
        <Block height={20} />
        {error?.error && (
          <Message retry danger retryFn={onSubmit} message={error?.error} />
        )}
        <FromInput
          label="Username"
          placeholder="Enter Username"
          value={form.userName || null}
          onChangeText={(value) => {
            onChange({ name: "userName", value });
          }}
          error={errors.userName || error?.username?.[0]}
        />
        <FromInput
          label="First name"
          placeholder="Enter First name"
          value={form.firstName || null}
          onChangeText={(value) => {
            onChange({ name: "firstName", value });
          }}
          error={errors.firstName || error?.first_name?.[0]}
        />
        <FromInput
          label="Last Name"
          placeholder="Enter Last name"
          value={form.lastName || null}
          onChangeText={(value) => {
            onChange({ name: "lastName", value });
          }}
          error={errors.lastName || error?.last_name?.[0]}
        />
        <FromInput
          label="E-mail"
          placeholder="Enter Email"
          value={form.email || null}
          onChangeText={(value) => {
            onChange({ name: "email", value });
          }}
          error={errors.email || error?.email?.[0]}
        />
        <FromInput
          label="Password"
          placeholder="Enter Password"
          secureTextEntry={isSecureEntry}
          value={form.password || null}
          onChangeText={(value) => {
            onChange({ name: "password", value });
          }}
          error={errors.password || error?.password?.[0]}
          rightIcon={
            <Button
              nativeFeedback
              transparent
              onPress={() => setIsSecureEntry(!isSecureEntry)}
            >
              <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
            </Button>
          }
        />
        <CustomButton
          loading={loading}
          onPress={onSubmit}
          disabled={loading}
          primary
          title="Submit"
        />
        <Block row>
          <Text size={17}>Already have an account?</Text>
          <Button
            nativeFeedback
            onPress={() => {
              navigation.navigate(LOGIN);
            }}
          >
            <Text paddingLeft={17} color={colors.primary} size={16}>
              Login
            </Text>
          </Button>
        </Block>
      </Block>
    </Container>
  );
}
