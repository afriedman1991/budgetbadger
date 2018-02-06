import React from 'react';
import ReactModal from 'react-modal';
import styles from '../../../../public/main/jStyles.js';
import {Box, Button, CheckBox, CloseIcon,Columns, DateTime, Form, FormField, Footer, Header, Heading, Label, Layer, NumberInput, SearchInput, Select, TextInput} from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import {CREATE_BILL, CREATE_BILL_CATEGORY} from '../../../queries.js';
import gql from 'graphql-tag';


var getInputCategoryID = (value, billCategoryObjs) => {
  let filteredCategories = billCategoryObjs.filter(billCategoryObj => billCategoryObj.name.toLowerCase() === value.toLowerCase());
  return filteredCategories.length > 0 ? filteredCategories[0].id : 0;
}


class AddBillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:1,
      bill_category_id:0,
      bill_category_description:'',
      description:'',
      amount:'',
      due_date:'',
      paid:false,
      paid_date:'',
      alert:false,
      bill_categories: [],
      bill_descriptions: []
    }

    this.handleBillCategoryType = this.handleBillCategoryType.bind(this);
    this.handleBillCategorySelect = this.handleBillCategorySelect.bind(this);
    this.handleBillAmountChange = this.handleBillAmountChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleDescriptionType = this.handleDescriptionType.bind(this);
    this.handleDescriptionSelect = this.handleDescriptionSelect.bind(this);
    this.handleAlertChange = this.handleAlertChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCancelUpdateClick = this.handleCancelUpdateClick.bind(this);
  }

  handleBillCategoryType(e) {
    e.preventDefault();
    this.setState({bill_category_description: e.target.value});
    this.setState({bill_category_id: getInputCategoryID(e.target.value, this.props.billCategories)});
    let filteredCategories = this.props.billCategories
      .filter(categoryObj => categoryObj.name.toLowerCase()
        .includes(this.state.bill_category_description.toLowerCase())
      )
      .map(categoryObj => categoryObj.name);
    this.setState({ bill_categories: filteredCategories });
  }

  handleBillCategorySelect(e) {
    let category = this.props.billCategories
      .filter(categoryObj => 
        categoryObj.name.toLowerCase() === e.suggestion.toLowerCase());
    this.setState({bill_category_description:e.suggestion})
    this.setState({bill_category_id:category[0].id});
  }

  handleDescriptionType(e) {
    this.setState({ description: e.target.value });
    let filteredDescriptions = this.props.bills
      .filter(bill => bill.description.toLowerCase()
      .includes(e.target.value.toLowerCase()))
      .map(bill => bill.description);
      this.setState({bill_descriptions:filteredDescriptions})
  }

  handleDescriptionSelect(e) {
    this.setState({description:e.suggestion})
  }

  handleBillAmountChange(e) {
    this.setState({amount:e.target.value})
  }

  handleDueDateChange(e) {
    this.setState({due_date:e})
  }
  
  handleAlertChange(e) {
    this.setState({alert: !this.state.alert});
  }

  handleCancelUpdateClick(e) {
    e.preventDefault();
    this.props.handleFormToggle();
    this.setState({
      user_id:1,
      bill_category_id:'',
      bill_category_description:'',
      description:'',
      paid: false,
      amount:'',
      due_date:'',
    });
  }
  
  handleAddClick(e) {
    if (this.state.bill_category_id) {
      let variables = {
        user_id: this.state.user_id,
        bill_category_id: this.state.bill_category_id,
        description: this.state.description,
        amount: this.state.amount,
        due_date: new Date(this.state.due_date),
        paid: this.state.paid,
        paid_date: new Date(this.state.paid_date),
        alert: this.state.alert,
      };
      this.props.CREATE_BILL({variables: variables})
      .then(({ data }) => {
        this.setState({
          user_id:1,
          bill_category_id:'',
          bill_category_description:'',
          description:'',
          paid: false,
          amount:'',
          due_date:'',
        });
      })
      .catch(error => {
        console.log('error saving new bill after saving new bill category', error);
      });
    } else {
      this.props.CREATE_BILL_CATEGORY({
        variables: { 
          name: this.state.bill_category_description,
          user_id: this.state.user_id
        }
      })
      .then(({ data }) => {
        let newBillVariables = {
          user_id: this.state.user_id,
          bill_category_id: data.createBillCategory.id,
          description: this.state.description,
          amount: this.state.amount,
          due_date: new Date(this.state.due_date),
          paid: this.state.paid,
          paid_date: new Date(this.state.paid_date),
          alert: this.state.alert,
        };
        this.props.CREATE_BILL({variables: newBillVariables})
          .then(({ data }) => {
            this.setState({
              user_id:1,
              bill_category_id:'',
              bill_category_description:'',
              description:'',
              paid: false,
              amount:'',
              due_date:'',
            });
          })
          .catch(error => {
            console.log('error saving new bill after saving new bill category', error);
          });
      })
      .catch(error => {
        console.log('error saving new bill category', error);
      });
    }
    this.props.handleFormToggle();
  }

  render() {
    if (this.props.billFormToggle) {
      return (
        <Layer 
          closer='true'
          onClose={this.props.handleFormToggle}
          flush="true"
          overlayClose="true"
        >
        <Form style={{padding:'10%'}}>
          <Header>
            <Heading tag='h3' strong='true'>Enter bill details:</Heading>
          </Header>
          <Heading tag='h4' margin='small'>Bill Category:
            <div>
              <SearchInput
                value = {this.state.bill_category_description}
                placeHolder='Enter Description'
                suggestions={this.state.bill_categories}
                onSelect = {this.handleBillCategorySelect}
                onDOMChange = {this.handleBillCategoryType}
              />
            </div>
          </Heading>
          <Heading tag='h4' margin='medium'>Bill Description:
            <div>
              <SearchInput
                value = {this.state.description}
                placeHolder='Enter Description'
                suggestions = {this.state.bill_descriptions}
                onSelect = {this.handleDescriptionSelect}
                onDOMChange = {this.handleDescriptionType}
              />
              </div>
          </Heading>
          <Heading tag='h4' margin='small'>Bill Amount:
            <div>
            <NumberInput 
              placeHolder='Enter Amount'
              value = {this.state.amount} 
              onChange = {this.handleBillAmountChange}
              min = {0.00}
            />
              </div>
          </Heading>
          <Heading tag='h4'  margin='small'>Bill Due Date:
          <div>
            <DateTime id='id'
                name='name'
                format='M/D/YYYY'
                step={5}
                onChange={this.handleDueDateChange}
                value={this.state.due_date} 
            />
            </div>
          </Heading>
          <Footer pad={{"vertical": "medium"}}>
            <Columns justify="center" size="small" maxCount="2">
              <Box align="center" pad="small">
                <Button
                    label="Cancel"
                    primary={true}
                    onClick={this.handleCancelUpdateClick}
                    style={{
                      backgroundColor: '#49516f',
                      color: 'white',
                      width: '130px',
                      fontSize: '20px',
                      padding: '6px 12px',
                      border: 'none',
                    }}
                  />
              </Box>
                <Box align="center" pad="small">
                  <Button label='Add'
                    primary={true}
                    onClick={this.handleAddClick} 
                    style={{backgroundColor:'#49516f', color:'white', width: '130px', fontSize:'20px', padding:'6px 12px', border:'none'}}
                  />
                </Box>
            </Columns>
            </Footer>
        </Form>
      </Layer>)
  } else { 
    return (<div></div>)
  }
  }
}

export default compose(
  graphql(CREATE_BILL_CATEGORY, { name: 'CREATE_BILL_CATEGORY' }), 
  graphql(CREATE_BILL, {name: 'CREATE_BILL', 
    options: {
      refetchQueries: [
        'BILLS_QUERY'
      ],
    }
  })
)(AddBillForm);