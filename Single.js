import React from "react";
// import * as signalsService from "./signals.service";
import * as validationHelper from "../helpers/validation.helper";
// import DatePicker from "react-bootstrap-date-picker";
import { Carousel, Col, PageHeader } from "react-bootstrap";
import I from "../images/i.png";
import Hi from "../images/hi.png";
import Wifi from "../images/wifi.png";

class Single extends React.PureComponent {
  constructor(props) {
    super(props);
    const formData = this.convertPropsToFormData(props);

    this.state = {
      formData: formData,
      formValid: false,
      infos: []
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    // this.handleDatePickerOnChange = this.handleDatePickerOnChange.bind(this);
  }

  // handleDatePickerOnChange(value) {
  //   const eventObject = {
  //     target: {
  //       value: value,
  //       name: "dateToPublish"
  //     }
  //   };
  //   this.onChange(eventObject);
  // }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const myInfo = props.formData && props.formData._id ? props.formData : {};

    const initializedInfo = {
      _id: myInfo._id || "",
      title: myInfo.title || "",
      date: myInfo.date || "",
      body: myInfo.body || "",
      createDate: myInfo.createDate || "",
      updateDate: myInfo.updateDate || ""
    };

    let formData = {
      _id: {
        originalValue: initializedInfo._id,
        value: initializedInfo._id,
        valid: true,
        validation: {},
        touched: false
      },
      title: {
        originalValue: initializedInfo.title,
        value: initializedInfo.title,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      date: {
        originalValue: initializedInfo.date,
        value: initializedInfo.date,
        valid: true,
        validation: {
          // required: true
        },
        touched: false
      },
      body: {
        originalValue: initializedInfo.body,
        value: initializedInfo.body,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      createDate: {
        originalValue: initializedInfo.createDate,
        value: initializedInfo.createDate,
        valid: true,
        validation: {},
        touched: false
      },
      updateDate: {
        originalValue: initializedInfo.updateDate,
        value: initializedInfo.updateDate,
        valid: true,
        validation: {},
        touched: false
      }
    };
    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }
    return formData;
  }

  onSave(event) {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      debugger;
      return;
    } else {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      this.setState({ formData: formData });
      debugger;
    }

    console.log("this.state.formData=", this.state.formData);
    console.log(
      "this.state.formData.title.value=",
      this.state.formData.title.value
    );
    console.log(
      "this.state.formData.body.value=",
      this.state.formData.body.value
    );

    // this.setState({ formValid: false });
    // const that = this;
    // let item = {
    //   title: this.state.formData.title.value,
    //   // date: this.state.formData.date.value,
    //   body: this.state.formData.body.value
    // };

    // if (this.state.formData._id.value.length > 0) {
    //   item._id = this.state.formData._id.value;
    //   item.createDate = this.state.formData.createDate.value;
    //   item.updateDate = this.state.formData.updateDate.value;
    //   signalsService
    //     .update(item)
    //     .then(data => {
    //       that.props.onSave(item);
    //     })
    //     .catch(error => {
    //       console.log("error=", error);
    //     });
    // } else {
    //   signalsService
    //     .create(item)
    //     .then(data => {
    //       this.setState(prevState => {
    //         const field = { ...prevState.formData._id, _id: data };
    //         const formData = { ...prevState.formData, _id: field };
    //         return { ...prevState, formData: formData };
    //       });
    //       that.props.onSave({ ...item, _id: data.item });
    //     })
    //     .catch(error => console.log("error=", error));
    // }
  }

  render() {
    console.log("this.state.formData=", this.state.formData);
    debugger;
    const infos = this.state.infos ? (
      this.state.infos.map(info => (
        <ol
          className="list-unstyled"
          key={info._id}
          onClick={this.onSelect.bind(this, info)}
        >
          <li>
            Title: <b>{this.state.formData.title.value}</b>
          </li>
          <li>
            Body: <b>{this.state.formData.body.value}</b>
          </li>
          {/* <li>
            Create Date:<b>{info.createDate}</b>
          </li>
          <li>
            Update Date:<b>{info.updateDate}</b>
          </li>
          <li>
            Body:<b>{info.date}</b>
          </li> */}
          <hr />
        </ol>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <PageHeader bsClass="text-center">Welcome to Signals!</PageHeader>
        <div className="row col-md-2 col-md-offset-5 centered">
          <Col md={12}>
            <Carousel>
              <Carousel.Item>
                <img width={200} height={200} alt="" src={I} />
              </Carousel.Item>
              <Carousel.Item>
                <img width={200} height={200} alt="" src={Hi} />
              </Carousel.Item>
              <Carousel.Item>
                <img width={200} height={200} alt="" src={Wifi} />
              </Carousel.Item>
            </Carousel>
          </Col>
        </div>
        <br />
        <br />

        <div className="form-group col-md-6">
          <form className="MainForm ">
            <fieldset>
              <div
                className={
                  !this.state.formData.title.touched
                    ? "col-md-12 has-feedback"
                    : !this.state.formData.title.valid
                      ? "col-md-12 has-error"
                      : "col-md-12 has-success"
                }
              >
                <label htmlFor="control-label">Title:</label>
                <div className="input-group col-md-12">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                    value={this.state.formData.title.value}
                    onChange={this.onChange}
                  />
                  <i
                    className={
                      !this.state.formData.title.valid &&
                      this.state.formData.title.touched
                        ? "form-control-feedback glyphicon glyphicon-remove"
                        : "form-control-feedback glyphicon glyphicon-ok"
                    }
                    data-bv-icon-for="title"
                    style={{
                      display: this.state.formData.title.touched
                        ? "block"
                        : "none"
                    }}
                  />
                  {!this.state.formData.title.valid &&
                  this.state.formData.title.touched ? (
                    <p className="text-danger has-error">
                      {"  "}
                      A title is required.
                    </p>
                  ) : null}
                </div>
              </div>
            </fieldset>

            {/* <fieldset>

                  <div
                    className={
                      !this.state.formData.date.touched
                        ? "col-md-12 has-feedback"
                        : !this.state.formData.date.valid
                          ? "col-md-12 has-error"
                          : "col-md-12 has-success"
                    }
                  >
                    <label htmlFor="control-label">Date:</label>
                    <div className="input-group col-md-12">
                      <DatePicker
                        type="text"
                        name="dateToPublish"
                        className="form-control"
                        value={this.state.formData.dateToPublish.value}
                        onChange={this.handleDatePickerOnChange}
                      />
                      <i
                        className={
                          !this.state.formData.dateToPublish.valid &&
                          this.state.formData.dateToPublish.touched
                            ? "form-control-feedback glyphicon glyphicon-remove"
                            : "form-control-feedback glyphicon glyphicon-ok"
                        }
                        data-bv-icon-for="dateToPublish"
                        style={{
                          display: this.state.formData.dateToPublish.touched
                            ? "block"
                            : "none"
                        }}
                      />
                      {!this.state.formData.dateToPublish.valid &&
                      this.state.formData.dateToPublish.touched ? (
                        <p className="text-danger has-error">
                          {"  "}
                          A date is required
                        </p>
                      ) : null}
                    </div>
                  </div>

            </fieldset> */}

            <fieldset>
              <div className="form-group">
                <div
                  className={
                    !this.state.formData.body.touched
                      ? "col-md-12 has-feedback"
                      : !this.state.formData.body.valid
                        ? "col-md-12 has-error"
                        : "col-md-12 has-success"
                  }
                >
                  <label htmlFor="control-label">Body:</label>
                  <div className="input-group col-md-12">
                    <textarea
                      type="text"
                      name="body"
                      placeholder="Body"
                      className="form-control"
                      value={this.state.formData.body.value}
                      onChange={this.onChange}
                    />
                    <i
                      className={
                        !this.state.formData.body.valid &&
                        this.state.formData.body.touched
                          ? "form-control-feedback glyphicon glyphicon-remove"
                          : "form-control-feedback glyphicon glyphicon-ok"
                      }
                      data-bv-icon-for="body"
                      style={{
                        display: this.state.formData.body.touched
                          ? "block"
                          : "none"
                      }}
                    />
                    {!this.state.formData.body.valid &&
                    this.state.formData.body.touched ? (
                      <p className="text-danger has-error">
                        {"  "}
                        Please input some text.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div className="form-group">
                <div className="col-md-6">
                  <label htmlFor="createDate">Create Date:</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    name="createDate"
                    value={this.state.formData.createDate.value}
                    onChange={this.onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="updateDate">Update Date:</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    name="updateDate"
                    value={this.state.formData.updateDate.value}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </fieldset>

            <br />
            <fieldset>
              <div className="form-group">
                <div className="btn-grp col-md-12" role="group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onSave}
                    disabled={!this.state.formValid}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.props.onCancel}
                    disabled={
                      // !this.state.formData._id.value &&
                      !this.state.formData.title.touched &&
                      !this.state.formData.body.touched
                      // !this.state.formData.date.touched
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.onDelete(this.state.formData)}
                    disabled={!this.state.formValid}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>

        {/* <div className="col-md-6">
            formData={this.state.formData}
            onSave={this.onSave}
            onDelete={this.onDelete}
            onCancel={this.onCancel}
            />
          </div> */}
        <div className="col-md-6">
          <h5>List</h5>
          {/* <ListGroup>
              <ListGroupItem>{this.state.infos}</ListGroupItem>
            </ListGroup> */}
          {infos}
        </div>
      </React.Fragment>
    );
  }
}

export default Single;
