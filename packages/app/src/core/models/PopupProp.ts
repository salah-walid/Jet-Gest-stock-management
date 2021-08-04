export default interface PopUpProp<T>{
    isPopup?: boolean;
    select?: (selected: T) => void
}