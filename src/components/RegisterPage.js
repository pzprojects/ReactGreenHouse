import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  CustomInput,
  Alert,
  FormFeedback,
  FormText
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../components/Loader';
import Vegetables from '../components/Vegetables';
import VegetablesPricing from '../components/VegetablesPricing';
import { getChoosenVegetables } from '../actions/choosenVegetablesAction';
import { addFarmer } from '../actions/farmerAction';


class RegisterPage extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    passwordconfirmation: '',
    familyname: '',
    phone: '',
    sizearea: 'מרכז',
    hamamasize: '',
    aboutme: '',
    msg: null,
    profileimg: '',
    file: '',
    imageurl: '',
    imagePreviewUrl: '',
    imagename: '',
    usertype: 'חקלאי',
    ActivateLoader: false,
    VegtButtonOn: true,
    AddBackgroundClassToVeg: 'vegetables',
    cost1 : '200',
    plan1 : false,
    Checkplan1: '',
    cost2 : '300',
    plan2 : false,
    Checkplan2: '',
    cost3 : '400',
    plan3 : false,
    Checkplan3: '',
    PasswordValidation: true,
    ScreenNumber: "1",
    Regulations: false,
    RegulationsValidation: true,
    CheckRegulations: '',
    fullname: '',
    accountnumber: '',
    bankname: '',
    banknumber: '',
    CreditCardfullname: '',
    CreditCardNumber: '',
    CreditCardDate: '',
    CreditCardCVV: '',
    CreditCardBusniessNumber: '',
    PasswordStrengthValidation: true,
    nameValidation: true,
    emailValidation: true,
    familynameValidation: true,
    phoneValidation: true,
    hamamasizeValidation: true
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getChoosenVegetables: PropTypes.func.isRequired,
    choosenvegetable: PropTypes.object.isRequired,
    addFarmer: PropTypes.func.isRequired,
    farmer: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getChoosenVegetables();
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        ActivateLoader: false
      });
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
        if (isAuthenticated) {
          this.toggle();
        }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
        modal: !this.state.modal
    });
    this.setState({
      ActivateLoader: !this.state.ActivateLoader
    });
    this.props.history.push('/FarmersubmissionMSG');
  };

  ValidateEmail = (mail) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  ValidateForm = () => {

    var Validated = true;
    var ScrollToLocation = "top";
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    // Regulations
    if(this.state.Regulations === false){
      this.setState({
        RegulationsValidation: false
      });
      Validated = false;
      ScrollToLocation = "bottom";
    }

    // Passwords
    if(this.state.password !== this.state.passwordconfirmation){
      this.setState({
        PasswordValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    if(this.state.password.length < 8 || !this.state.password.match(numbers) || !this.state.password.match(upperCaseLetters ) || !this.state.password.match(lowerCaseLetters )){
      this.setState({
        PasswordStrengthValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    // Empty fields
    if(this.state.name === ''){
      this.setState({
        nameValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    if(this.state.email === '' || !this.ValidateEmail(this.state.email)){
      this.setState({
        emailValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    if(this.state.familyname === ''){
      this.setState({
        familynameValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    if(this.state.phone === ''){
      this.setState({
        phoneValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    if(this.state.hamamasize === ''){
      this.setState({
        hamamasizeValidation: false
      });
      Validated = false;
      ScrollToLocation = "top";
    }

    if(!Validated){
      if(ScrollToLocation === "top"){
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }

    return Validated;
  };

  ChangeScreen = (ScreenNum) => {
    if(this.ValidateForm()){
      this.setState({
        ScreenNumber: ScreenNum
      });
    }
  };

  ResetValidation = (FieldToReset) => {

    switch(FieldToReset) {
      case "password":
        // password
        this.setState({
          PasswordValidation: true
        });
        break;
      case "Regulations":
        // Regulations
        this.setState({
          RegulationsValidation: true
        });
        break;
      case "PasswordStrength":
        // Regulations
        this.setState({
          PasswordStrengthValidation: true
        });
        break;
      case "name":
        // Regulations
        this.setState({
          nameValidation: true
        });
        break;
      case "familyname":
        // Regulations
        this.setState({
          familynameValidation: true
        });
        break;
      case "email":
        // Regulations
        this.setState({
          emailValidation: true
        });
        break;
      case "phone":
        // Regulations
        this.setState({
          phoneValidation: true
        });
        break;
      case "hamamasize":
        // Regulations
        this.setState({
          hamamasizeValidation: true
        });
        break;
      default:
    }
  };

  onChange = e => {
    // deal with checkbox
    switch(e.target.name) {
      case "Checkplan1":
        this.setState({
          plan1: e.target.checked
        });
        break;
      case "Checkplan2":
        this.setState({
          plan2: e.target.checked
        });
        break;
      case "Checkplan3":
        this.setState({
          plan3: e.target.checked
        });
        break;
      default:
    }
    
    // validations
    switch(e.target.name) {
      case "passwordconfirmation":
        // password validation
        if(this.state.PasswordValidation === false){
          this.ResetValidation("password")
        }
        break;
      case "password":
        // password strength validation
        if(this.state.PasswordStrengthValidation === false){
          this.ResetValidation("PasswordStrength")
        }
      break;
      case "CheckRegulations":
        // Regulations validation
        if(e.target.checked === true){
          this.ResetValidation("Regulations")
        }
        this.setState({
          Regulations: e.target.checked
        });
        break;
      case "name":
        // password strength validation
        if(this.state.nameValidation === false){
          this.ResetValidation("name")
        }
        break;
      case "familyname":
        // password strength validation
        if(this.state.familynameValidation === false){
          this.ResetValidation("familyname")
        }
        break;
      case "email":
        // password strength validation
        if(this.state.emailValidation === false){
          this.ResetValidation("email")
        }
        break;
      case "phone":
        // password strength validation
        if(this.state.phoneValidation === false){
          this.ResetValidation("phone")
        }
        break;
      case "hamamasize":
        // password strength validation
        if(this.state.hamamasizeValidation === false){
          this.ResetValidation("hamamasize")
        }
        break;
      default:
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if(this.ValidateForm()){

      const choosenvegetables = this.props.choosenvegetable.ChoosenVegetables;
      let plans = [];
      if(this.state.plan1) plans.push({name: "מגדל עצמאי", cost: this.state.cost1});
      if(this.state.plan2) plans.push({name: "ביניים", cost: this.state.cost2});
      if(this.state.plan3) plans.push({name: "ליווי שוטף", cost: this.state.cost3});
    
      this.setState({
        ActivateLoader: !this.state.ActivateLoader,
        modal: !this.state.modal
      });

      if(this.state.imagename!==''){
        this.uploadFile();
      }


      const { name, email, password, familyname, phone, sizearea, hamamasize, aboutme, imageurl, usertype } = this.state;

      // Create user object
      const newUser = {
        name,
        email,
        password,
        familyname,
        phone,
        sizearea,
        hamamasize,
        aboutme,
        imageurl,
        choosenvegetables,
        plans,
        usertype
      };

      const newFarmer = {
        name,
        familyname,
        phone,
        email,
        sizearea,
        hamamasize,
        aboutme,
        imageurl,
        choosenvegetables,
        plans
      };

      // Attempt to register
      this.props.addFarmer(newFarmer);
      this.props.register(newUser);

    }
  };

  handleUploadFile = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    
    const Allfiles = e.target.files;
    if (Allfiles && Allfiles.length > 0) {
      const tempFile = Allfiles[0];
      this.setState({ file: tempFile });
      const improvedname = uuidv4() + tempFile.name;
      const GenerateUrl = "https://profileimages12.s3.eu-west-1.amazonaws.com/" + improvedname;
      this.setState({imageurl: GenerateUrl, imagename: improvedname});
    }

    reader.onloadend = () => {
      this.setState({
        profileimg: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  OpenFileExplorer = e => {
    e.preventDefault();

    document.getElementById("profileimg").click()

  }

  uploadFile = e => {
    
    const { file } = this.state;
    const contentType = file.type; // eg. image/jpeg or image/svg+xml

    const generatePutUrl = '/generate-put-url';
    const options = {
      params: {
        Key: this.state.imagename,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    };

    axios.get(generatePutUrl, options).then(res => {
      const {
        data: { putURL }
      } = res;
      axios
        .put(putURL, file, options)
        .then(res => {
        })
        .catch(err => {
          console.log('err', err);
        });
    });
  };

  OpenListOfvegetables = e => {
    e.preventDefault();
    
    let ChoosenClass = this.state.AddBackgroundClassToVeg;

    if(ChoosenClass === 'vegetablesOpen'){
      ChoosenClass = 'vegetables';
    }
    else ChoosenClass = 'vegetablesOpen';

    this.setState({
      VegtButtonOn: !this.state.VegtButtonOn,
      AddBackgroundClassToVeg: ChoosenClass
    });

  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = (<img alt="" className="ProfileImage" src={require('../Resources/Upload.png')} onClick={this.OpenFileExplorer}/>);
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="" className="ProfileImage" src={imagePreviewUrl} onClick={this.OpenFileExplorer} />);
    }

    return (
      <div>
        <Container>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            {this.state.ScreenNumber === "1" ? (
                  <div className='RegisterStatus'>
                    <img alt="" src={require('../Resources/Step1-farmer.png')} />
                  </div>
                ) : 
                  null
            }
            {this.state.ScreenNumber === "2" ? (
                  <div className='RegisterStatus'>
                    <img alt="" src={require('../Resources/Step2-farmer.png')} />
                  </div>
                ) : 
                  null
            }
            {this.state.ScreenNumber === "3" ? (
                  <div className='RegisterStatus'>
                    <img alt="" src={require('../Resources/Step3-farmer.png')} />
                  </div>
                ) : 
                  null
            }
            {this.state.ScreenNumber === "4" ? (
                  <div className='RegisterStatus'>
                    <img alt="" src={require('../Resources/Step4-farmer.png')} />
                  </div>
                ) : 
                  null
            }
            <Form onSubmit={this.onSubmit}>
            {this.state.ScreenNumber === "1" || this.state.ScreenNumber === "4" ? (
              <FormGroup>
                {this.state.ScreenNumber === "1" ? (
                  <div className='ProfileName'>
                    <h1>פרופיל חקלאי</h1>
                  </div>
                ) : 
                  <div className='ProfileName'>
                    <h1>שליחה לאישור סופי</h1>
                  </div>
                }
              <div className='PersonalDetails'>
                <div className="form-group">
                  <Label for='name'>שם פרטי</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    placeholder=''
                    className='mb-3'
                    onChange={this.onChange}
                    value={this.state.name}
                    invalid= {!this.state.nameValidation}
                    required
                  />
                  <FormFeedback>שדה זה אינו יכול להישאר ריק</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='familyname'>שם משפחה</Label>
                  <Input
                    type='text'
                    name='familyname'
                    id='familyname'
                    placeholder=''
                    className='mb-3'
                    onChange={this.onChange}
                    value={this.state.familyname}
                    invalid= {!this.state.familynameValidation}
                    required
                  />
                  <FormFeedback>שדה זה אינו יכול להישאר ריק</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='phone'>טלפון</Label>
                  <Input
                    type='text'
                    name='phone'
                    id='phone'
                    placeholder=''
                    className='mb-3'
                    onChange={this.onChange}
                    value={this.state.phone}
                    invalid= {!this.state.phoneValidation}
                    required
                  />
                  <FormFeedback>שדה זה אינו יכול להישאר ריק</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='email'>אימייל (שם משתמש)</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder=''
                    className='mb-3'
                    onChange={this.onChange}
                    value={this.state.email}
                    invalid= {!this.state.emailValidation}
                    required
                  />
                  <FormFeedback>כתובת האימייל שגויה</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='password'>סיסמה</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder=''
                    className='mb-3'
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    invalid= {!this.state.PasswordStrengthValidation}
                    onChange={this.onChange}
                    value={this.state.password}
                    required
                  />
                  <FormFeedback>הסיסמה חייבת להכיל 8 תווים, אות גדולה, אות קטנה ומספר</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='passwordconfirmation'>אימות סיסמה</Label>
                  <Input
                    type='password'
                    name='passwordconfirmation'
                    id='passwordconfirmation'
                    placeholder=''
                    className='mb-3'
                    onChange={this.onChange}
                    value={this.state.passwordconfirmation}
                    invalid= {!this.state.PasswordValidation}
                  />
                  <FormFeedback>הסיסמאות לא זהות!</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='sizearea'>אזור השטח לגידול</Label>
                  <Input type="select" name="sizearea" id="sizearea" className='SizeArea mb-3' onChange={this.onChange} value={this.state.sizearea}>
                    <option>מרכז</option>
                    <option>דרום</option>
                    <option>צפון</option>
                  </Input>
                </div>
                <div className="form-group">
                  <Label for='hamamasize'>גודל שטח החממה</Label>
                  <Input
                    type='text'
                    name='hamamasize'
                    id='hamamasize'
                    placeholder=''
                    className='mb-3'
                    onChange={this.onChange}
                    value={this.state.hamamasize}
                    invalid= {!this.state.hamamasizeValidation}
                    required
                  />
                  <FormText>* יש להזין את גודל השטח בכפולות של X מ"ר</FormText>
                  <FormFeedback>שדה זה אינו יכול להישאר ריק</FormFeedback>
                </div>
                <div className="form-group">
                  <Label for='aboutme'>על עצמי</Label>
                  <Input type="textarea" name="aboutme" id="aboutme" className='AboutMe mb-3' onChange={this.onChange} value={this.state.aboutme}/>
                  <FormText>* טקסט זה יופיע כאשר הלקוח יבחר חקלאי</FormText>
                </div>
              </div>
              <div className='UploadImage'>
                <Input type="file" name="profileimg" id="profileimg" onChange={this.handleUploadFile} />
                {$imagePreview}
              </div>
              <div className={this.state.AddBackgroundClassToVeg}>
                <h3>יש לי את התנאים והניסיון לגדל:</h3>
                { this.state.VegtButtonOn ? 
                <Button color="success" onClick={this.OpenListOfvegetables}>רשימת ירקות לגידול</Button> : null }
                { this.state.VegtButtonOn ? null : <Vegetables OpenListOfvegetables={this.OpenListOfvegetables} /> }
              </div>
              <div className="ListOfVegCost">
                <p>המחירים הינם מומלצים ע"י החנות של Co-Greenhouse וניתנים לשינוי</p>
                <VegetablesPricing />
              </div>
              <div className="Plans">
                <div className="PlanCard">
                  <div className="PlanCardHeader">
                    <div className="Card1Image">
                       <img
                        alt=""
                        src={require('../Resources/plan1.png')}
                        className='PlanHeaderVegetableImage'
                       />
                      <Label check for='Checkplan1'>
                        <CustomInput 
                        type="checkbox"
                        name='Checkplan1'
                        id='Checkplan1'
                        className='mb-3'
                        defaultChecked={this.state.plan1}
                        onChange={this.onChange} />
                      </Label> 
                      <span className='PlanTitle' >מגדל עצמאי</span>
                    </div>
                  </div>
                  <div className="PlanCardBody">
                    <div className="CardCost">
                      <div className="CardCostLabel">
                        <Label check for='cost1'>
                          <Input 
                          type="text"
                          name='cost1'
                          id='cost1'
                          className='mb-3'
                          placeholder={this.state.cost1}
                          value={this.state.cost1}
                          onChange={this.onChange} />
                        </Label> 
                      <span>ש"ח</span>
                      </div>
                    </div>
                    <div className="CardDetails">
                      <span className="CardDetailsHeader">במסלול זה אין התערבות של החקלאי<br /> המסלול כולל:</span>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>שטח</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>מים</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="PlanCard">
                  <div className="PlanCardHeader">
                    <div className="Card2Image">
                       <img
                        alt=""
                        src={require('../Resources/plan2.png')}
                        className='PlanHeaderVegetableImage'
                       />
                      <Label check for='Checkplan2'>
                        <CustomInput 
                        type="checkbox"
                        name='Checkplan2'
                        id='Checkplan2'
                        className='mb-3'
                        defaultChecked={this.state.plan2}
                        onChange={this.onChange} />
                      </Label> 
                      <span className='PlanTitle' >ביניים</span>
                    </div>
                  </div>
                  <div className="PlanCardBody">
                    <div className="CardCost">
                      <div className="CardCostLabel">
                        <Label check for='cost2'>
                          <Input 
                          type="text"
                          name='cost2'
                          id='cost2'
                          value={this.state.cost2}
                          className='mb-3'
                          placeholder={this.state.cost2}
                          onChange={this.onChange} />
                        </Label> 
                        <span>ש"ח</span>
                      </div>
                    </div>
                    <div className="CardDetails">
                      <span className="CardDetailsHeader">במסלול זה יש התערבות חלקית של החקלאי<br /> המסלול כולל:</span>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>ייעוץ אישי</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>שטח</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>מים</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>דישון</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="PlanCard">
                  <div className="PlanCardHeader">
                    <div className="Card3Image">
                       <img
                        alt=""
                        src={require('../Resources/plan3.png')}
                        className='PlanHeaderVegetableImage'
                       />
                      <Label check for='Checkplan3'>
                        <CustomInput 
                        type="checkbox"
                        name='Checkplan3'
                        id='Checkplan3'
                        className='mb-3'
                        defaultChecked={this.state.plan3}
                        onChange={this.onChange} />
                      </Label> 
                      <span className='PlanTitle' >ליווי שוטף</span>
                    </div>
                  </div>
                  <div className="PlanCardBody">
                    <div className="CardCost">
                      <div className="CardCostLabel">
                        <Label check for='cost3'>
                          <Input 
                          type="text"
                          name='cost3'
                          id='cost3'
                          className='mb-3'
                          placeholder={this.state.cost3}
                          value={this.state.cost3}
                          onChange={this.onChange} />
                        </Label> 
                        <span>ש"ח</span>
                      </div>
                    </div>
                    <div className="CardDetails" >
                      <span className="CardDetailsHeader">במסלול זה יש התערבות מלאה של החקלאי<br /> המסלול כולל:</span>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>ייעוץ אישי</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>שטח</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>מים</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>דישון</span>
                      </div>
                      <div className='PlanIncludeSection'>
                        <span className='PlanVegetableImage'><img alt="" src={require('../Resources/Leaf.png')} size='sm' /></span>
                        <span className='PlanVegetableImageText'>טיפול מלא בחלקה</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ApproveRegulations'>
                <div  className='RegulationsCheckBox'>
                  <Label check for='CheckRegulations'>
                  <CustomInput 
                    type="checkbox"
                    name='CheckRegulations'
                    id='CheckRegulations'
                    className='mb-3'
                    onChange={this.onChange}
                    defaultChecked={this.state.Regulations}
                    invalid= {!this.state.RegulationsValidation} />
                  </Label> 
                </div>
                  <div  className='RegulationsLink'>
                    <span>קראתי את </span>
                    <a href="/" target="_blank" >התקנון</a>
                    <span> ואני מסכים לכל תנאיו</span>
                </div>
              </div>
              {this.state.ScreenNumber === "1" ? (
              <div className='MoveToPaymentScreenButton'>
                <Button color="info" onClick={() => this.ChangeScreen("2")} type="button" >
                  המשך להזנת אמצעי תשלום
                </Button>
              </div>
              ) : null}
            </FormGroup>
            ) : null}

            {this.state.ScreenNumber === "2" || this.state.ScreenNumber === "4" ? (
              <FormGroup>
                <div className='BankCollectPaymentContainer'>
                  <div className='BankCollectPayment'>
                    <span className='RecivePaymentHeader'>חשבון בנק לקבלת תשלום</span>
                    <div className="payment-form-group">
                      <Label for='fullname'></Label>
                      <Input
                        type='text'
                        name='fullname'
                        id='fullname'
                        placeholder='שם בעל החשבון'
                        className='mb-3'
                        onChange={this.onChange}
                        value={this.state.fullname}
                      />
                    </div>
                    <div className="payment-form-group">
                      <Label for='accountnumber'></Label>
                      <Input
                        type='text'
                        name='accountnumber'
                        id='accountnumber'
                        placeholder='מספר חשבון הבנק'
                        className='mb-3'
                        onChange={this.onChange}
                        value={this.state.accountnumber}
                      />
                    </div>
                    <div className="payment-form-group">
                      <div className="bankDetails">
                        <div className="bankname">
                          <Label for='bankname'></Label>
                          <Input type="select" name="bankname" id="bankname" className='mb-3' placeholder='בנק' onChange={this.onChange} value={this.state.bankname}>
                            <option>בחר בנק</option>
                            <option>בנק אגוד</option>
                            <option>בנק אוצר החייל</option>
                            <option>בנק דיסקונט</option>
                            <option>בנק הפועלים</option>
                            <option>בנק לאומי</option>
                            <option>בנק מזרחי</option>
                            <option>הבנק הבינלאומי</option>
                        </Input>
                        </div>
                        <div className="banknumber">
                          <Label for='banknumber'></Label>
                          <Input
                            type='text'
                            name='banknumber'
                            id='banknumber'
                            placeholder='שם בעל החשבון'
                            className='mb-3'
                            onChange={this.onChange}
                            value={this.state.banknumber}
                          />
                        </div>
                    </div>
                   </div>
                   {this.state.ScreenNumber === "2" ? (
                     <div className='MoveToSecondPaymentScreenButton'>
                       <Button color="info" onClick={() => this.ChangeScreen("3")} type="button" >
                          אישור
                       </Button>
                     </div>
                   ) : null}                  
                  </div>
                </div>
              </FormGroup>
            ) : null}

            {this.state.ScreenNumber === "3" || this.state.ScreenNumber === "4" ? (
              <FormGroup>
                <div className='BankCollectPaymentContainer'>
                  <div className='BankCollectPayment'>
                    <span className='RecivePaymentHeader'>אמצעי תשלום</span>
                    <div className="payment-form-group">
                      <Label for='CreditCardfullname'></Label>
                      <Input
                        type='text'
                        name='CreditCardfullname'
                        id='CreditCardfullname'
                        placeholder='שם בעל הכרטיס'
                        className='mb-3'
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="payment-form-group">
                      <Label for='CreditCardNumber'></Label>
                      <Input
                        type='text'
                        name='CreditCardNumber'
                        id='CreditCardNumber'
                        placeholder='מספר כרטיס האשראי'
                        className='mb-3'
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="payment-form-group">
                      <div className="bankDetails">
                        <div className="bankname">
                          <Label for='CreditCardDate'></Label>
                          <Input 
                          type="text"
                          maxLength="5"
                          name="CreditCardDate"
                          id="CreditCardDate"
                          className='mb-3'
                          placeholder='תוקף'
                          onChange={this.onChange}>
                        </Input>
                        </div>
                        <div className="banknumber">
                          <Label for='CreditCardCVV'></Label>
                          <Input
                            type='text'
                            name='CreditCardCVV'
                            id='CreditCardCVV'
                            placeholder='CVV'
                            className='mb-3'
                            onChange={this.onChange}
                          />
                        </div>
                    </div>
                   </div>
                   <div className="payment-form-group">
                      <Label for='CreditCardBusniessNumber'></Label>
                      <Input
                        type='text'
                        name='CreditCardBusniessNumber'
                        id='CreditCardBusniessNumber'
                        placeholder='מספר עוסק מורשה/ח.פ'
                        className='mb-3'
                        onChange={this.onChange}
                      />
                    </div>
                    {this.state.ScreenNumber === "3" ? (
                     <div className='MoveToSecondPaymentScreenButton'>
                       <Button color="info" onClick={() => this.ChangeScreen("4")} type="button" >
                         אישור
                       </Button>
                     </div>
                    ) : null}  
                  </div>
                </div>
              </FormGroup>
            ) : null}

            {this.state.ScreenNumber === "4" ? (
              <div className='RegisterButtonContainer'>
                <Button className='RegisterButton' >
                  הירשם
                </Button>
              </div>
            ) : null}
            </Form>
            { this.state.ActivateLoader ? <Loader /> : null }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  choosenvegetable: state.choosenvegetable,
  farmer: state.farmer
});

export default connect(
  mapStateToProps,
  { register, clearErrors, getChoosenVegetables, addFarmer }
)(RegisterPage);