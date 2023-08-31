import "react-quill/dist/quill.snow.css";
// const Test=(  (isShowTest)=>{
    const Test=({isShowTest})=>{

    // const ProductDetails = ({    isShowDetailsProduct }) => {
    const getStyle=()=>{
        return isShowTest    ? { right: '0px' } : {};
    }

    return (

        <div  id='productContainer2'  style={getStyle()} >
            <h1>Hi Mouna ! <b>Goddd Test :) </b> </h1>

        </div>
    )
}
export default Test;
