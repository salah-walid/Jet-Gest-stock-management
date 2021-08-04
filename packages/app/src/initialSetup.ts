import AuthentificationService, { AuthentificationServiceSingleton } from "./core/services/authentificationService";

const initialSetup = async () => {
    let authService : AuthentificationService = AuthentificationServiceSingleton;
    authService.loadLocalToken();
    await authService.getUser();
}

export default initialSetup;