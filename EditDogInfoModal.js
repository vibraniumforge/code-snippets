import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  InputGroup
} from "react-bootstrap";
import * as validationHelper from "../helpers/validation.helper";
import update from "immutability-helper";
import * as dogsService from "../services/dogs.service";
import DatePicker from "react-16-bootstrap-date-picker";
import BreedsDropdown from "../containers/BreedsDropdown";;

class EditDogInfoModal extends React.PureComponent {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);
    this.state = {
      dog: [],
      showEditDogInfoModal: false,
      formData: formData,
      formValid: false
    };

    this.openEditDogInfoModal = this.openEditDogInfoModal.bind(this);
    this.closeEditDogInfoModal = this.closeEditDogInfoModal.bind(this);
    this.onChange = validationHelper.onChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleDatePickerOnChange = this.handleDatePickerOnChange.bind(this);
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (
      this.props.dogId &&
      this.props.dogId !== "undefined" &&
      this.props.dogId.length > 0
    ) {
      dogsService.readById(this.props.dogId).then(dog => {
        this.setState({ dog: dog.item });
        const formData = this.convertPropsToFormData(dog.item);
        this.setState({ formData: formData });
      });
    }
    if (nextProps.open) {
      this.openEditDogInfoModal(nextProps);
    }
  }

  convertPropsToFormData(props) {
    const editDogInfoForm = props && props._id ? props : {};

    const initializedEditDogInfoForm = {
      _id: editDogInfoForm._id || "",
      name: editDogInfoForm.name || "",
      dogBreedId: editDogInfoForm.dogBreedId || "",
      gender: editDogInfoForm.gender || "",
      adoptionDate: editDogInfoForm.adoptionDate || "",
      userId: editDogInfoForm.userId || ""
    };

    let formData = {
      userId: {
        originalValue: initializedEditDogInfoForm.userId,
        value: initializedEditDogInfoForm.userId,
        valid: true,
        validation: {},
        touched: false
      },
      _id: {
        originalValue: initializedEditDogInfoForm._id,
        value: initializedEditDogInfoForm._id,
        valid: true,
        validation: {},
        touched: false
      },
      name: {
        originalValue: initializedEditDogInfoForm.name,
        value: initializedEditDogInfoForm.name,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      dogBreedId: {
        originalValue: initializedEditDogInfoForm.dogBreedId,
        value: initializedEditDogInfoForm.dogBreedId,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      gender: {
        originalValue: initializedEditDogInfoForm.gender,
        value: initializedEditDogInfoForm.gender,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      adoptionDate: {
        originalValue: initializedEditDogInfoForm.adoptionDate,
        value: initializedEditDogInfoForm.adoptionDate,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      }
    };

    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }
    return formData;
  }

  openEditDogInfoModal(props) {
    this.setState({ showEditDogInfoModal: props.open });
  }

  closeEditDogInfoModal() {
    this.setState(prevState => {
      return {
        ...prevState,
        showEditDogInfoModal: false
      };
    });
    this.props.close();
  }

  clearForm() {
    const formData = update(this.state.formData, {
      name: { value: { $set: "" } },
      dogBreedId: { value: { $set: "" } },
      gender: { value: { $set: "" } },
      adoptionDate: { value: { $set: "" } }
    });
    this.setState({
      formData: formData
    });
  }

  handleDatePickerOnChange(value) {
    const eventObject = {
      target: {
        value: value,
        name: "adoptionDate"
      }
    };
    this.onChange(eventObject);
  }

  onSave() {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
      return;
    }
    this.setState({ formValid: false });
    let item = {
      name: this.state.formData.name.value,
      dogBreedId: this.state.formData.dogBreedId.value,
      gender: this.state.formData.gender.value,
      adoptionDate: this.state.formData.adoptionDate.value,
      _id: this.state.formData._id.value,
      userId: this.state.formData.userId.value
    };
    dogsService
      .update(item)
      .then(data => {
        if (data.isSuccessful) {
          this.closeEditDogInfoModal();
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.state.showEditDogInfoModal}
          onHide={this.closeEditDogInfoModal}
        >
          <Modal.Header closeButton>
            <Modal.Title bsStyle="pull-right">
              <b>Edit Dog Info</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <InputGroup className="col-md-12">
                  <h5>Dog Name:</h5>
                  <FormControl
                    type="text"
                    name="name"
                    placeholder="Dog Name"
                    className="col-md-5"
                    value={this.state.formData.name.value}
                    onChange={this.onChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="col-md-12">
                  <h5>Dog Breed:</h5>
                  <BreedsDropdown
                    type="text"
                    className="form-control"
                    name="dogBreedId"
                    value={this.state.formData.dogBreedId.value}
                    onChange={this.onChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="col-md-12">
                  <h5>Dog Gender:</h5>
                  <select
                    type="text"
                    className="form-control"
                    name="gender"
                    value={this.state.formData.gender.value}
                    onChange={this.onChange}
                  >
                    <option value="">Dog Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="form-control">
                  <h5>Adoption Date:</h5>
                  <DatePicker
                    type="text"
                    className="form-control"
                    name="adoptionDate"
                    value={this.state.formData.adoptionDate.value}
                    onChange={this.handleDatePickerOnChange}
                  />
                </InputGroup>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeEditDogInfoModal}>Cancel</Button>
            <Button
              bsStyle="primary"
              onClick={this.onSave}
              disabled={!this.state.formValid}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

      </React.Fragment>
    );
  }
}

export default EditDogInfoModal;
