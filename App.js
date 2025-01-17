import React from "react";
import { useKindeAuth } from "@kinde/expo";
import { Pressable, View, Text } from "react-native";
import { KindeAuthProvider } from "@kinde/expo";

export default function App() {
  return (
    <KindeAuthProvider config={{
      domain: "csnapit-seahorse.eu.kinde.com",
      clientId: "98d0959ecd8b4157bca6970f4e7b20f2",
      scopes: "openid profile email offline",
    }}>
      <Authentication />
    </KindeAuthProvider>
  );
}

function Authentication() {
  const { login, register, logout, isAuthenticated } = useKindeAuth();

  const handleSignUp = async () => {
    const response = await register({});
    if (response.success) {
      console.log("User Registered:", response);
    } else {
      console.error("Signup Failed:", response.errorMessage);
    }
  };

  const handleSignIn = async () => {
    const response = await login({});
    if (response.success) {
      console.log("User Logged In:", response);
    } else {
      console.error("Login Failed:", response.errorMessage);
    }
  };

  const handleLogout = async () => {
    await logout({ revokeToken: true });
    console.log("User Logged Out");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!isAuthenticated ? (
        <>
          <Pressable onPress={handleSignIn} style={{ marginBottom: 10 }}>
            <Text>Sign In</Text>
          </Pressable>
          <Pressable onPress={handleSignUp}>
            <Text>Sign Up</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
      )}
    </View>
  );
}
