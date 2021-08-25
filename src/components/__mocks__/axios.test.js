import AuthService from '../../services/authService';
import mockAxios from 'axios';



it('User signup for a credit card ', async() => {
    mockAxios.post.mockImplementationOnce( () => Promise.resolve({
        data: {cards: ['Sapphire']}
    }))


const { data: { cards }} = await AuthService.userCreditCardSignup();

expect(cards).toEqual(['Sapphire']);

expect(mockAxios.post).toHaveBeenCalled();
})



it('Admin updates the user information ', async() => {
    mockAxios.put.mockImplementationOnce( () => Promise.resolve({
        data: {username: ['Dhoni77']}
    }))


const { data: { username }} = await AuthService.updateUserInfo();

expect(username).toEqual(['Dhoni77']);

expect(mockAxios.post).toHaveBeenCalled();
})


it('Admin updates the user information ', async() => {
    mockAxios.put.mockImplementationOnce( () => Promise.resolve({
        data: {username: ['Dhoni77']}
    }))


const { data: { username }} = await AuthService.updateUserInfo();

expect(username).toEqual(['Dhoni77']);

expect(mockAxios.post).toHaveBeenCalled();
})

