export interface IBuyCredits {
    page: number;
    handleDepositData: (value: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}
