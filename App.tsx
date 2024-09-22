import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type UserDetails = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  gender: string;
  orderId: string | null;
};

const App: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    gender: '',
    orderId: null,
  });

  const [chatMode, setChatMode] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wrongOrderId, setWrongOrderId] = useState<string>('');

  const handleFormSubmit = () => {
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.address ||
      !userDetails.phone ||
      !userDetails.gender
    ) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    const generatedOrderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    setUserDetails((prevState) => ({
      ...prevState,
      orderId: generatedOrderId,
    }));
    Alert.alert('Order Created', `Your order ID is ${generatedOrderId}`);
  };

  const handleChatOption = (option: string) => {
    setSelectedOption(option);
  };

  const renderChatbotOptions = () => (
    <View style={styles.chatContainer}>
      <View style={styles.chatMessage}>
        <Text style={styles.chatText}>Hi, how can I help you?</Text>
      </View>
      <TouchableOpacity style={styles.chatButton} onPress={() => handleChatOption('details')}>
        <Text style={styles.chatButtonText}>1. Display Order Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={() => handleChatOption('wrongOrder')}>
        <Text style={styles.chatButtonText}>2. Received Wrong Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={() => handleChatOption('status')}>
        <Text style={styles.chatButtonText}>3. Has the Order Been Dispatched?</Text>
      </TouchableOpacity>
    </View>
  );

  const renderChatResponse = () => {
    if (selectedOption === 'details') {
      return (
        <View style={styles.chatMessage}>
          <Text style={styles.chatText}>Order Details:</Text>
          <Text style={styles.chatText}>Order ID: {userDetails.orderId}</Text>
          <Text style={styles.chatText}>Name: {userDetails.firstName} {userDetails.lastName}</Text>
          <Text style={styles.chatText}>Address: {userDetails.address}</Text>
          <Text style={styles.chatText}>Phone: {userDetails.phone}</Text>
          <Text style={styles.chatText}>Gender: {userDetails.gender}</Text>
        </View>
      );
    } else if (selectedOption === 'status') {
      return (
        <View style={styles.chatMessage}>
          <Text style={styles.chatText}>Order is on the way and will arrive shortly.</Text>
        </View>
      );
    } else if (selectedOption === 'wrongOrder') {
      return (
        <View style={styles.chatMessage}>
          <Text style={styles.chatText}>Enter your Order ID:</Text>
          <TextInput
            style={styles.input}
            value={wrongOrderId}
            onChangeText={setWrongOrderId}
            placeholder="Order ID"
            placeholderTextColor="gray"
          />
          <TouchableOpacity style={styles.chatButton} onPress={() => setSelectedOption('wrongOrderOptions')}>
            <Text style={styles.chatButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (selectedOption === 'wrongOrderOptions') {
      return (
        <View style={styles.chatMessage}>
          <Text style={styles.chatText}>What seems to be the problem?</Text>
          <TouchableOpacity style={styles.chatButton} onPress={() => Alert.alert('Refund', 'Your refund has been processed.')}>
            <Text style={styles.chatButtonText}>1. Do you want a refund?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} onPress={() => Alert.alert('Issue', 'We will investigate the issue.')}>
            <Text style={styles.chatButtonText}>2. Order not delivered but showing delivered?</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={chatMode ? styles.chatBackground : styles.formBackground}>
      {!chatMode ? (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Enter your details</Text>
          
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={userDetails.firstName}
            onChangeText={(text) => setUserDetails((prevState) => ({ ...prevState, firstName: text }))}
            placeholder="First Name"
            placeholderTextColor="gray"
          />
          
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={userDetails.lastName}
            onChangeText={(text) => setUserDetails((prevState) => ({ ...prevState, lastName: text }))}
            placeholder="Last Name"
            placeholderTextColor="gray"
          />
          
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={userDetails.address}
            onChangeText={(text) => setUserDetails((prevState) => ({ ...prevState, address: text }))}
            placeholder="Address"
            placeholderTextColor="gray"
          />
          
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={userDetails.phone}
            onChangeText={(text) => setUserDetails((prevState) => ({ ...prevState, phone: text }))}
            placeholder="Phone Number"
            placeholderTextColor="gray"
            keyboardType="phone-pad"
          />
          
          <Text style={styles.label}>Gender:</Text>
          <Picker
            selectedValue={userDetails.gender}
            onValueChange={(itemValue) => setUserDetails((prevState) => ({ ...prevState, gender: itemValue }))}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
            <Text style={styles.submitButtonText}>Submit Details and Get Order ID</Text>
          </TouchableOpacity>

          {userDetails.orderId && (
            <TouchableOpacity style={styles.chatButton} onPress={() => setChatMode(true)}>
              <Text style={styles.chatButtonText}>Chat with our Bot</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {renderChatbotOptions()}
          {renderChatResponse()}

          <TouchableOpacity style={styles.goBackButton} onPress={() => {
            setChatMode(false);
            setSelectedOption(null);
          }}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formBackground: {
    backgroundColor: '#ff6f61', // Flamingo Pink
    padding: 20,
    flex: 1,
  },
  chatBackground: {
    backgroundColor: '#ffeb3b', // Yellow
    padding: 20,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black', // Text color changed to black
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#28a745', // Green
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  chatContainer: {
    marginVertical: 20,
  },
  chatMessage: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatText: {
    fontSize: 16,
    color: 'black',
  },
  chatButton: {
    backgroundColor: '#007bff', // Blue
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  chatButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  goBackButton: {
    backgroundColor: '#6c757d', // Gray
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  goBackButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
