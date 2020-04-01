import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input, Label, CustomInput } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { getfarmersbyarea } from '../actions/farmerAction';
import { updatechoosenfarmer, getchoosenfarmer } from '../actions/choosenFarmerAction';
import { addToGrowerVegBag, deleteFromGrowerVegBag, getGrowerVegBag } from '../actions/growerVegChoiceAction';
import PropTypes from 'prop-types';

class ChooseFarmer extends Component {
  state = {
    ChoosenFarmerId : '',
    GrowerVeg1 :  '',
    GrowerVeg2 :  '',
    GrowerVeg3 :  '',
    GrowerVeg4 :  '',
    TotalPayment: '0',
  };

  static propTypes = {
    getfarmersbyarea: PropTypes.func.isRequired,
    farmer: PropTypes.object.isRequired,
    updatechoosenfarmer: PropTypes.func.isRequired,
    getchoosenfarmer: PropTypes.func.isRequired,
    choosenfarmer: PropTypes.object.isRequired,
    growervegbuyingbag: PropTypes.object.isRequired,
    deleteFromGrowerVegBag: PropTypes.func.isRequired,
    addToGrowerVegBag: PropTypes.func.isRequired,
    getGrowerVegBag: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getfarmersbyarea(this.props.SizeAreaParam);
    this.props.getchoosenfarmer();
    this.props.getGrowerVegBag();

    if(this.props.choosenfarmer.ChoosenFarmerById[0] !== undefined && this.props.choosenfarmer.ChoosenFarmerById[0] !== null){
        this.setState({
            ChoosenFarmerId: this.props.choosenfarmer.ChoosenFarmerById[0]._id
          },() => {
            this.UpdateAllSelectedFields();
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.SizeAreaParam !== prevProps.SizeAreaParam || this.props.PlanParam !== prevProps.PlanParam) {
      this.setState({
        ChoosenFarmerId: ''
      },() => {
        this.props.updatechoosenfarmer();
        this.props.getfarmersbyarea(this.props.SizeAreaParam, this.props.PlanParam);
      });
    };
  }
  
  UpdateAllSelectedFields = () => {
    var ChoosenVegArray = this.props.choosenfarmer.ChoosenFarmerById[0].choosenvegetables;
    var GrowerBag = this.props.growervegbuyingbag.VegToBuy;
    console.log(GrowerBag[0]);

    if(this.state.GrowerVeg1 === ''){
      if(GrowerBag[0] !== undefined){
          this.setState({
            GrowerVeg1: GrowerBag[0].name
          })
      }
      else {
        console.log("here")
        this.setState({
            GrowerVeg1: ChoosenVegArray[0].name
        })
      }
    }
  };

  ReturnChoosingVegtabilesAsString = (Mychoosenvegetables) => {
    var VegAsString = '';
    for(var i=0; i<Mychoosenvegetables.length ;i++){
      if(Mychoosenvegetables.length === (i+1)){
        VegAsString += Mychoosenvegetables[i].name;
      }
      else VegAsString += Mychoosenvegetables[i].name + ", ";   
    }
    return VegAsString;
  };

  GetVegAmount = (ItemId) => {
    var ChoosenVegArray = this.props.choosenfarmer.ChoosenFarmerById[0].choosenvegetables;
    var Amount = '';
    switch(ItemId) {
        case "1":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
              if(ChoosenVegArray[i].name === this.state.GrowerVeg1){
                Amount = ChoosenVegArray[i].averagecrop;
              }
          }
          break;
        case "2":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
              if(ChoosenVegArray[i].name === this.state.GrowerVeg2){
                Amount = ChoosenVegArray[i].averagecrop;
              }
          }
          break;
        case "3":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
              if(ChoosenVegArray[i].name === this.state.GrowerVeg3){
                Amount = ChoosenVegArray[i].averagecrop;
              }
          }
          break;
        case "4":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
              if(ChoosenVegArray[i].name === this.state.GrowerVeg4){
                Amount = ChoosenVegArray[i].averagecrop;
              }
          }
          break;
        default:
          Amount = "0";
    }

    Amount += ' ק"ג'

    return Amount;
  };

  GetPlanData = (DataType) => {
    var PlanDataToReturn = '';
    if(this.props.PlanParam !== '' && this.props.PlanParam !== null && this.props.PlanParam !== undefined ){
      const planprice = this.props.choosenfarmer.ChoosenFarmerById[0].plans.find(item => item.name === this.props.PlanParam);
      if( planprice !== undefined ){
        if(DataType === "name"){
          PlanDataToReturn = this.props.PlanParam + ' ש"ח';
        }
        else PlanDataToReturn = planprice.cost + ' ש"ח';
      }
    }
    else PlanDataToReturn = '';

    return PlanDataToReturn;
  }

  GetVegData = (ItemId, DataType) => {
    var ChoosenVegArray = this.props.choosenfarmer.ChoosenFarmerById[0].choosenvegetables;
    var DataToRetrive = '';
    switch(ItemId) {
        case "1":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
              if(ChoosenVegArray[i].name === this.state.GrowerVeg1){
                if(DataType === "amount"){
                  DataToRetrive = ChoosenVegArray[i].amount;
                }
                else {
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                }
              }
          }
          break;
        case "2":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
            if(ChoosenVegArray[i].name === this.state.GrowerVeg2){
                if(DataType === "amount"){
                  DataToRetrive = ChoosenVegArray[i].amount;
                }
                else {
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                }
            }
          }
          break;
        case "3":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
            if(ChoosenVegArray[i].name === this.state.GrowerVeg3){
                if(DataType === "amount"){
                  DataToRetrive = ChoosenVegArray[i].amount;
                }
                else {
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                }
            }
          }
          break;
        case "4":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
            if(ChoosenVegArray[i].name === this.state.GrowerVeg4){
                if(DataType === "amount"){
                  DataToRetrive = ChoosenVegArray[i].amount;
                }
                else {
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                }
            }
          }
          break;
        default:
        DataToRetrive = "0";
    }

    if(DataType === "amount"){
      DataToRetrive += ' שתילים'
    }
    else DataToRetrive += ' ש"ח'

    return DataToRetrive;
  };

  GetTotalPayment = () => {
    var ChoosenVegArray = this.props.choosenfarmer.ChoosenFarmerById[0].choosenvegetables;
    var DataToRetrive = 0;

    for( var i=0;  i < ChoosenVegArray.length; i++ ){
      if(ChoosenVegArray[i].name === this.state.GrowerVeg1 ){
        DataToRetrive += parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
        break;
      }
    }

    for( var i=0;  i < ChoosenVegArray.length; i++ ){
      if(ChoosenVegArray[i].name === this.state.GrowerVeg2 ){
        DataToRetrive += parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
        break;
      }
    }

    for( var i=0;  i < ChoosenVegArray.length; i++ ){
      if(ChoosenVegArray[i].name === this.state.GrowerVeg3 ){
        DataToRetrive += parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
        break;
      }
    }

    for( var i=0;  i < ChoosenVegArray.length; i++ ){
      if(ChoosenVegArray[i].name === this.state.GrowerVeg4 ){
        DataToRetrive += parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
        break;
      }
    }

    if(this.props.PlanParam !== '' && this.props.PlanParam !== null && this.props.PlanParam !== undefined){
      const planprice = this.props.choosenfarmer.ChoosenFarmerById[0].plans.find(item => item.name === this.props.PlanParam);
      if(planprice !== undefined){
        DataToRetrive +=  parseFloat(planprice.cost);
      }
    }

    DataToRetrive = DataToRetrive.toString() + ' ש"ח';

    return DataToRetrive;
  
  }

  GetVegTotalBilling = (ItemId, DataType) => {
    var ChoosenVegArray = this.props.choosenfarmer.ChoosenFarmerById[0].choosenvegetables;
    var DataToRetrive = '';
    switch(ItemId) {
        case "1":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
              if(ChoosenVegArray[i].name === this.state.GrowerVeg1){
                switch(DataType) {
                  case "averagecrop":
                    DataToRetrive = ChoosenVegArray[i].amount;
                    break;
                  case "price":
                    DataToRetrive = ChoosenVegArray[i].price;
                    break;
                  case "Total":
                    var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                    DataToRetrive = CaculatedData.toString();
                    break;
                  default:
                }
              }
          }
          break;
        case "2":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
            if(ChoosenVegArray[i].name === this.state.GrowerVeg2){
              switch(DataType) {
                case "averagecrop":
                  DataToRetrive = ChoosenVegArray[i].amount;
                  break;
                case "price":
                  DataToRetrive = ChoosenVegArray[i].price;
                  break;
                case "Total":
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                  break;
                default:
              }
            }
          }
          break;
        case "3":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
            if(ChoosenVegArray[i].name === this.state.GrowerVeg3){
              switch(DataType) {
                case "averagecrop":
                  DataToRetrive = ChoosenVegArray[i].amount;
                  break;
                case "price":
                  DataToRetrive = ChoosenVegArray[i].price;
                  break;
                case "Total":
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                  break;
                default:
              }
            }
          }
          break;
        case "4":
          for( var i=0;  i < ChoosenVegArray.length; i++ ){
            if(ChoosenVegArray[i].name === this.state.GrowerVeg4){
              switch(DataType) {
                case "averagecrop":
                  DataToRetrive = ChoosenVegArray[i].amount;
                  break;
                case "price":
                  DataToRetrive = ChoosenVegArray[i].price;
                  break;
                case "Total":
                  var CaculatedData = parseFloat(ChoosenVegArray[i].amount) * parseFloat(ChoosenVegArray[i].price);
                  DataToRetrive = CaculatedData.toString();
                  break;
                default:
              }
            }
          }
          break;
        default:
        DataToRetrive = "0";
    }

    if(DataType !== "averagecrop"){
      DataToRetrive += ' ש"ח'
    }

    return DataToRetrive;
  };

  AddVegToGrowerBag = (VegValue, ValueToDelete) => {
    var ChoosenVegArray = this.props.choosenfarmer.ChoosenFarmerById[0].choosenvegetables;
    var ObjectToAdd = {};
    for( var i=0;  i < ChoosenVegArray.length; i++ ){
        if(ChoosenVegArray[i].name === VegValue){
          ObjectToAdd = ChoosenVegArray[i];
        }
    }

    if(ValueToDelete !== ''){
      this.props.deleteFromGrowerVegBag(ValueToDelete);
    }
    this.props.addToGrowerVegBag(ObjectToAdd);
  };

  onChange = e => {

    switch(e.target.getAttribute('name')) {
        case "FarmerChoice":
          var FilteredChoosenFarmer = this.props.farmer.farmers.filter(farmer => farmer._id === e.target.value);
          this.props.updatechoosenfarmer(FilteredChoosenFarmer);
          var ChoosenVegArrayToPlace = FilteredChoosenFarmer[0].choosenvegetables;
          this.setState({
            ChoosenFarmerId : e.target.value,
            GrowerVeg1: ChoosenVegArrayToPlace[0].name,
            GrowerVeg2: ChoosenVegArrayToPlace[0].name,
            GrowerVeg3: ChoosenVegArrayToPlace[0].name,
            GrowerVeg4: ChoosenVegArrayToPlace[0].name
          })

          for( var j=0;  j < 4; j++ ){
            this.props.addToGrowerVegBag(ChoosenVegArrayToPlace[0], '');
          }
          
          break;
        case "GrowerVeg1":
          this.AddVegToGrowerBag(e.target.value, this.state.GrowerVeg1);
          this.setState({ [e.target.name]: e.target.value });
          break;
        case "GrowerVeg2":
          this.AddVegToGrowerBag(e.target.value, this.state.GrowerVeg2);
          this.setState({ [e.target.name]: e.target.value });
          break;
        case "GrowerVeg3":
          this.AddVegToGrowerBag(e.target.value, this.state.GrowerVeg3);
          this.setState({ [e.target.name]: e.target.value });
          break;
        case "GrowerVeg4":
          this.AddVegToGrowerBag(e.target.value, this.state.GrowerVeg4);
          this.setState({ [e.target.name]: e.target.value });
          break;
        default:
    }
  }

  render() {
    const { farmers } = this.props.farmer;
    if(this.state.ChoosenFarmerId !== ''){
      var ExtractFarmer = this.props.farmer.farmers.filter(farmer => farmer._id === this.state.ChoosenFarmerId);
      var ChoosenFarmerContainer = ExtractFarmer[0].choosenvegetables;
    }
    else var ChoosenFarmerContainer = [];

    return (
      <Container>
        <div className="ListOfFarmersByArea">
        <ListGroup>
            <ListGroupItem className="FarmerListTitleListItem" >
            <div className='FarmerListTitle'>
                    <div className='FarmerListTitleText1'>
                      <span>שם החקלאי</span>
                    </div>
                    <div className='FarmerListTitleText2'>
                      <span>דבר החקלאי</span>
                    </div>
                    <div className='FarmerListTitleText3'>
                      <span>מגדל</span>
                    </div>
                    <div className='FarmerListTitleText4'>
                      <span>מסלולים</span>
                    </div>
            </div>
            </ListGroupItem>
        </ListGroup>
        <ListGroup>
            {farmers.map(({ _id, name, familyname, phone, email, sizearea, hamamasize, aboutme, imageurl, choosenvegetables, plans}) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <div className='FarmerList'>
                    <div  className='FarmerListRadioBtn'>
                      <Label check for={_id}>
                        <CustomInput 
                          type="radio"
                          name='FarmerChoice'
                          id={_id}
                          value={_id}
                          className='mb-3'
                          checked={this.state.ChoosenFarmerId === _id}
                          onChange={this.onChange} />
                      </Label> 
                    </div>
                    <div  className='FarmerListImage'>
                      <img
                        alt=""
                        src={imageurl}
                        className='FarmerThemeImage'
                      />
                    </div>
                    <div  className='FarmerListName'>
                      <span>{name + " " + familyname}</span>
                    </div>
                    <div  className='FarmerListAboutme'>
                      <span>{aboutme}</span>
                    </div>
                    <div  className='FarmerListchoosenvegetables'>
                      <span>{this.ReturnChoosingVegtabilesAsString(choosenvegetables)}</span>
                    </div>
                    <div className='FarmerListplans'>
                    {plans.map(function(item, secondkey) {
                         return (
                            <span className='PlanItem' key={secondkey}>
                              {item.name + '- ' + item.cost + ' ש"ח לחודש'}
                              <br/>
                            </span>
                          )
                     })}
                    </div>
                    <div  className='FarmerListReadMore'>
                      <span>קרא עוד</span>
                    </div>
                  </div>
                </ListGroupItem>
              </CSSTransition>
            ))}
        </ListGroup>
        </div>
        {this.state.ChoosenFarmerId !== '' && this.state.ChoosenFarmerId !== undefined ?
        <div className="GrowerMainPicking">
          <div className="GrowerVegContainer2">
            <div className="GrowerVegContainer2Example" >אנא בחר\י את הירקות שברצונך לגדל</div>
            <ListGroup>
              <ListGroupItem>
                <div className="GrowerMainPickingTitle">
                  צפי ייבול ממוצע
                </div>
              </ListGroupItem>
            </ListGroup>
            <ListGroup>
              <ListGroupItem>
                <div className="GrowerVegHolder">
                  <Label for='GrowerVeg1'></Label>
                  <Input type="select" name="GrowerVeg1" id="GrowerVeg1" className='GrowerVeg mb-3' onChange={this.onChange} value={this.state.GrowerVeg1}>
                    {ChoosenFarmerContainer.map(function(item, thirdkey) {
                      return (
                        <option className='GrowerVegItem' key={thirdkey}>
                          {item.name}
                        </option>
                      )
                    })}
                  </Input>
                </div>
                <div className="GrowerChoosenVegAVGPrice">
                  <span>{ this.GetVegAmount("1") }</span>
                </div>
                <div className="GrowerChoosenVegMoreInfo">
                  <span className="GrowerChoosenVegMoreInfoIMG"><img alt="" src={require('../Resources/QuestionMark.png')} /></span>
                  <span className="GrowerChoosenVegMoreInfoText">מידע נוסף</span>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="GrowerVegHolder">
                  <Label for='GrowerVeg2'></Label>
                  <Input type="select" name="GrowerVeg2" id="GrowerVeg2" className='GrowerVeg mb-3' onChange={this.onChange} value={this.state.GrowerVeg2}>
                    {ChoosenFarmerContainer.map(function(item, thirdkey) {
                      return (
                        <option className='GrowerVegItem' key={thirdkey}>
                          {item.name}
                        </option>
                      )
                    })}
                  </Input>
                </div>
                <div className="GrowerChoosenVegAVGPrice">
                  <span>{ this.GetVegAmount("2") }</span>
                </div>
                <div className="GrowerChoosenVegMoreInfo">
                  <span className="GrowerChoosenVegMoreInfoIMG"><img alt="" src={require('../Resources/QuestionMark.png')} /></span>
                  <span className="GrowerChoosenVegMoreInfoText">מידע נוסף</span>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="GrowerVegHolder">
                  <Label for='GrowerVeg3'></Label>
                  <Input type="select" name="GrowerVeg3" id="GrowerVeg3" className='GrowerVeg mb-3' onChange={this.onChange} value={this.state.GrowerVeg3}>
                    {ChoosenFarmerContainer.map(function(item, thirdkey) {
                      return (
                        <option className='GrowerVegItem' key={thirdkey}>
                          {item.name}
                        </option>
                      )
                    })}
                  </Input>
                </div>
                <div className="GrowerChoosenVegAVGPrice">
                  <span>{ this.GetVegAmount("3") }</span>
                </div>
                <div className="GrowerChoosenVegMoreInfo">
                  <span className="GrowerChoosenVegMoreInfoIMG"><img alt="" src={require('../Resources/QuestionMark.png')} /></span>
                  <span className="GrowerChoosenVegMoreInfoText">מידע נוסף</span>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="GrowerVegHolder">
                  <Label for='GrowerVeg4'></Label>
                  <Input type="select" name="GrowerVeg4" id="GrowerVeg4" className='GrowerVeg mb-3' onChange={this.onChange} value={this.state.GrowerVeg4}>
                    {ChoosenFarmerContainer.map(function(item, thirdkey) {
                      return (
                        <option className='GrowerVegItem' key={thirdkey}>
                          {item.name}
                        </option>
                      )
                    })}
                  </Input>
                </div>
                <div className="GrowerChoosenVegAVGPrice">
                  <span>{ this.GetVegAmount("4") }</span>
                </div>
                <div className="GrowerChoosenVegMoreInfo">
                  <span className="GrowerChoosenVegMoreInfoIMG"><img alt="" src={require('../Resources/QuestionMark.png')} /></span>
                  <span className="GrowerChoosenVegMoreInfoText">מידע נוסף</span>
                </div>
              </ListGroupItem>
           </ListGroup>
          </div>
          <div className="GrowerFieldsGroupsContainer" >
            <div className="GrowerFieldsGroupsContainerExample" >הרכב החלקה</div>
            <div className="GrowerFieldsGroupsSection" >
              <div className="GrowerHelka1" >
                <span className="GrowerHelkaName" >{this.state.GrowerVeg1}</span>
                <span className="GrowerHelkaAmount" >{this.GetVegData("1", "amount")}</span>
                <span className="GrowerHelkaTotal" >עלות כוללת:</span>
                <span className="GrowerHelkaTotalPrice" >{this.GetVegData("1", "totalcost")}</span>
              </div>
              <div className="GrowerHelka2" >
                <span className="GrowerHelkaName" >{this.state.GrowerVeg2}</span>
                <span className="GrowerHelkaAmount" >{this.GetVegData("2", "amount")}</span>
                <span className="GrowerHelkaTotal" >עלות כוללת:</span>
                <span className="GrowerHelkaTotalPrice" >{this.GetVegData("2", "totalcost")}</span>
              </div>
              <div className="GrowerHelka3" >
                <span className="GrowerHelkaName" >{this.state.GrowerVeg3}</span>
                <span className="GrowerHelkaAmount" >{this.GetVegData("3", "amount")}</span>
                <span className="GrowerHelkaTotal" >עלות כוללת:</span>
                <span className="GrowerHelkaTotalPrice" >{this.GetVegData("3", "totalcost")}</span>
              </div>
              <div className="GrowerHelka4" >
                <span className="GrowerHelkaName" >{this.state.GrowerVeg4}</span>
                <span className="GrowerHelkaAmount" >{this.GetVegData("4", "amount")}</span>
                <span className="GrowerHelkaTotal" >עלות כוללת:</span>
                <span className="GrowerHelkaTotalPrice" >{this.GetVegData("4", "totalcost")}</span>
              </div>
            </div>
          </div>
          <div className="GrowerFinalBilling" >
            <div className="GrowerFinalBillingContainer" >
            <div className="GrowerFinalBillingExample" >פירוט חשבון</div>
            <ul className="GrowerFinalBillingSection" >
              <li className="GrowerFinalBillingMainHeader1" >
                <span className="GrowerFinalBillingItemName" >פריט</span>
                <span className="GrowerFinalBillingItemPrice" >מחיר פריט</span>
                <span className="GrowerFinalBillingItemAmount" >כמות</span>
                <span className="GrowerFinalBillingItemTotal" >סה"כ</span>
              </li>
              <li>
                <span className="GrowerFinalBillingItemName" >{this.GetPlanData("name")}</span>
                <span className="GrowerFinalBillingItemPrice" >{this.GetPlanData("price")}</span>
                <span className="GrowerFinalBillingItemAmount" >1</span>
                <span className="GrowerFinalBillingItemTotal" >{this.GetPlanData("price")}</span>
              </li>
              <li>
                <span className="GrowerFinalBillingItemName" >שתילי {this.state.GrowerVeg1}</span>
                <span className="GrowerFinalBillingItemPrice" >{this.GetVegTotalBilling("1", "price")}</span>
                <span className="GrowerFinalBillingItemAmount" >{this.GetVegTotalBilling("1", "averagecrop")}</span>
                <span className="GrowerFinalBillingItemTotal" >{this.GetVegTotalBilling("1", "Total")}</span>
              </li>
              <li>
                <span className="GrowerFinalBillingItemName" >שתילי {this.state.GrowerVeg2}</span>
                <span className="GrowerFinalBillingItemPrice" >{this.GetVegTotalBilling("2", "price")}</span>
                <span className="GrowerFinalBillingItemAmount" >{this.GetVegTotalBilling("2", "averagecrop")}</span>
                <span className="GrowerFinalBillingItemTotal" >{this.GetVegTotalBilling("2", "Total")}</span>
              </li>
              <li>
                <span className="GrowerFinalBillingItemName" >שתילי {this.state.GrowerVeg3}</span>
                <span className="GrowerFinalBillingItemPrice" >{this.GetVegTotalBilling("3", "price")}</span>
                <span className="GrowerFinalBillingItemAmount" >{this.GetVegTotalBilling("3", "averagecrop")}</span>
                <span className="GrowerFinalBillingItemTotal" >{this.GetVegTotalBilling("3", "Total")}</span>
              </li>
              <li>
                <span className="GrowerFinalBillingItemName" >שתילי {this.state.GrowerVeg4}</span>
                <span className="GrowerFinalBillingItemPrice" >{this.GetVegTotalBilling("4", "price")}</span>
                <span className="GrowerFinalBillingItemAmount" >{this.GetVegTotalBilling("4", "averagecrop")}</span>
                <span className="GrowerFinalBillingItemTotal" >{this.GetVegTotalBilling("4", "Total")}</span>
              </li>
              <li className="GrowerFinalBillingMainHeader2" >
                <span className="GrowerFinalBillingItemName" >סה"כ לתשלום</span>
                <span className="GrowerFinalBillingItemPrice" ></span>
                <span className="GrowerFinalBillingItemAmount" ></span>
                <span className="GrowerFinalBillingItemTotal" >{this.GetTotalPayment()}</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
        : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
    farmer: state.farmer,
    choosenfarmer: state.choosenfarmer,
    growervegbuyingbag: state.growervegbuyingbag
});

export default connect(
  mapStateToProps,
  { getfarmersbyarea, updatechoosenfarmer, getchoosenfarmer, addToGrowerVegBag, deleteFromGrowerVegBag, getGrowerVegBag }
)(ChooseFarmer);