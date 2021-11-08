import { useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { Block, Button, Image, Text } from "rn-ui-kits";
import { Container, CustomButton, FromInput, Message } from "../components";
import { REGISTER } from "../constants/routesNames";
import loginUser from "../context/actions/auth/loginUser";
import { GlobalContext } from "../context/Provider";
import colors from "../theme/colors";

export default function Login({ navigation }) {
  const [form, setForm] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);
  const { params } = useRoute();
  const {
    authDispatch,
    authState: { error, loading },
  } = useContext(GlobalContext);

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      setForm({ ...form, userName: params.data.username });
    }
  }, [params]);

  function onSubmit() {
    if (form.userName && form.password) {
      loginUser(form)(authDispatch);
    } else {
      alert("Preencha os campos! ");
    }
  }
  function onChange({ name, value }) {
    setJustSignedUp(false);
    setForm({ ...form, [name]: value });
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
          Please login here
        </Text>
        <Block height={20} />
        {justSignedUp && (
          <Message
            onDismiss={() => {}}
            success
            message="Account created successfully"
          />
        )}
        {error && !error.error && (
          <Message onDismiss={() => {}} danger message="invalid credentials" />
        )}
        {error?.error && <Message danger onDismiss message={error?.error} />}
        <FromInput
          label="Username"
          placeholder="Enter Username"
          value={form.userName || null}
          onChangeText={(value) => {
            onChange({ name: "userName", value });
          }}
        />
        <FromInput
          label="Password"
          placeholder="Enter Password"
          secureTextEntry={isSecureEntry}
          value={form.password || null}
          onChangeText={(value) => {
            onChange({ name: "password", value });
          }}
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
          disabled={loading}
          onPress={onSubmit}
          loading={loading}
          primary
          title="Submit"
        />
        <Block row>
          <Text size={17}>Need a new account?</Text>
          <Button
            nativeFeedback
            onPress={() => {
              navigation.navigate(REGISTER);
            }}
          >
            <Text paddingLeft={17} color={colors.primary} size={16}>
              Register
            </Text>
          </Button>
        </Block>
      </Block>
    </Container>
  );
}
