import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { updateUser } from "@/lib/db";
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

const EditProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUser(userData);
      toast({
        title: "Profile updated.",
        description: "Your profile was successfully updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Box maxW="sm" mx="auto" mt={12} p={6}>
      <Heading textAlign="center">Edit Profile</Heading>
      <Box mt={6}>
        <form onSubmit={handleSubmit}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email" mt={4}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="phone" mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            width="full"
            mt={4}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
