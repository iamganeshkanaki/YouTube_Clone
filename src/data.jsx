export const API_KEY = 'AIzaSyAB08_Ax5ZDuRQGjCX8kSSpE-iyq5lnyik';

export const viewCounter = (value) => {    
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M";
    } else {
        if (value >= 1000) {
            return Math.floor(value / 1000) + "K";
        }
        else {
            return value;
        }
    }
}