import React from "react";
import * as validationHelper from "../helpers/validation.helper";
import * as blogService from "../services/blog.service";
import DatePicker from "react-16-bootstrap-date-picker";
import * as commaSeparator from "../helpers/commaSeparator";

class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    const formData = this.convertPropsToFormData(props);

    this.state = {
      blogs: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleDatePickerOnChange = this.handleDatePickerOnChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const blog = props.formData && props.formData._id ? props.formData : {};

    const initializedBlog = {
      _id: blog._id || "",
      title: blog.title || "",
      publisher: blog.publisher || "",
      body: blog.body || "",
      createDate: blog.createDate || "",
      updateDate: blog.updateDate || "",
      dateToPublish: blog.dateToPublish || "",
      tags: commaSeparator.getFromDB(blog.tags) || "",
      isActive:
        typeof blog.isActive === "undefined" ? "" : blog.isActive.toString()
    };

    let formData = {
      title: {
        originalValue: initializedBlog.title,
        value: initializedBlog.title,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      publisher: {
        originalValue: initializedBlog.publisher,
        value: initializedBlog.publisher,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      body: {
        originalValue: initializedBlog.body,
        value: initializedBlog.body,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      tags: {
        originalValue: initializedBlog.tags,
        value: initializedBlog.tags,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      isActive: {
        originalValue: initializedBlog.isActive,
        value: initializedBlog.isActive,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      dateToPublish: {
        originalValue: initializedBlog.dateToPublish,
        value: initializedBlog.dateToPublish,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      _id: {
        originalValue: initializedBlog._id,
        value: initializedBlog._id,
        valid: true,
        validation: {},
        touched: false
      },
      createDate: {
        originalValue: initializedBlog.createDate,
        value: initializedBlog.createDate,
        valid: true,
        validation: {},
        touched: false
      },
      updateDate: {
        originalValue: initializedBlog.updateDate,
        value: initializedBlog.updateDate,
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
      this.setState({ formData: formData });
      return;
    }
    this.setState({ formValid: false });
    const that = this;
    let item = {
      title: this.state.formData.title.value,
      publisher: this.state.formData.publisher.value,
      body: this.state.formData.body.value,
      isActive: this.state.formData.isActive.value,
      dateToPublish: this.state.formData.dateToPublish.value,
      tags: commaSeparator.saveToDB(this.state.formData.tags.value)
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      item.createDate = this.state.formData.createDate.value;
      item.updateDate = this.state.formData.updateDate.value;
      blogService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => {
          console.log("error=", error);
        });
    } else {
      blogService
        .create(item)
        .then(data => {
          this.setState(prevState => {
            const field = { ...prevState.formData._id, _id: data };
            const formData = { ...prevState.formData, _id: field };
            return { ...prevState, formData: formData };
          });
          that.props.onSave({ ...item, _id: data.item });
        })
        .catch(error => console.log("error=", error));
    }
  }

  handleDatePickerOnChange(value) {
    const eventObject = {
      target: {
        value: value,
        name: "dateToPublish"
      }
    };
    this.onChange(eventObject);
  }

  render() {
    return (
      <React.Fragment>
        <form className="blogsForm">
          <fieldset>
            <div className="form-row">
              <div className="form-group">
                <div
                  className={
                    !this.state.formData.title.touched
                      ? "col-md-8 has-feedback"
                      : !this.state.formData.title.valid
                        ? "col-md-8 has-error"
                        : "col-md-8 has-success"
                  }
                >
                  <label className="control-label">Title</label>
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
                        A title is required
                      </p>
                    ) : null}
                  </div>
                </div>
                <div
                  className={
                    !this.state.formData.isActive.touched
                      ? "col-md-4 has-feedback"
                      : !this.state.formData.isActive.valid
                        ? "col-md-4 has-error"
                        : "col-md-4 has-success"
                  }
                >
                  <label className="control-label">Is Active?</label>
                  <div className="input-group col-md-12">
                    <select
                      className="form-control"
                      name="isActive"
                      value={this.state.formData.isActive.value}
                      onChange={this.onChange}
                    >
                      <option value="">Please choose</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                    <i
                      className={
                        !this.state.formData.isActive.valid &&
                        this.state.formData.isActive.touched
                          ? "form-control-feedback glyphicon glyphicon-remove"
                          : "form-control-feedback glyphicon glyphicon-ok"
                      }
                      data-bv-icon-for="isActive"
                      style={{
                        display: this.state.formData.isActive.touched
                          ? "block"
                          : "none"
                      }}
                    />

                    {!this.state.formData.isActive.valid &&
                    this.state.formData.isActive.touched ? (
                      <p className="text-danger has-error">
                        {"  "}
                        This field is required
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-row">
              <div className="form-group">
                <div
                  className={
                    !this.state.formData.dateToPublish.touched
                      ? "col-md-4 has-feedback"
                      : !this.state.formData.dateToPublish.valid
                        ? "col-md-4 has-error"
                        : "col-md-4 has-success"
                  }
                >
                  <label className="control-label">Date To Publish</label>
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
                <div
                  className={
                    !this.state.formData.publisher.touched
                      ? "col-md-8 has-feedback"
                      : !this.state.formData.publisher.valid
                        ? "col-md-8 has-error"
                        : "col-md-8 has-success"
                  }
                >
                  <label className="control-label">Publisher</label>
                  <div className="input-group col-md-12">
                    <textarea
                      type="text"
                      name="publisher"
                      placeholder="Publisher"
                      className="form-control"
                      value={this.state.formData.publisher.value}
                      onChange={this.onChange}
                    />
                    <i
                      className={
                        !this.state.formData.publisher.valid &&
                        this.state.formData.publisher.touched
                          ? "form-control-feedback glyphicon glyphicon-remove"
                          : "form-control-feedback glyphicon glyphicon-ok"
                      }
                      data-bv-icon-for="publisher"
                      style={{
                        display: this.state.formData.publisher.touched
                          ? "block"
                          : "none"
                      }}
                    />
                    {!this.state.formData.publisher.valid &&
                    this.state.formData.publisher.touched ? (
                      <p className="text-danger has-error">
                        {"  "}
                        Please input the blog entry publisher
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-row">
              <div className="form-group">
              <div
                  className={
                    !this.state.formData.tags.touched
                      ? "col-md-12 has-feedback"
                      : !this.state.formData.tags.valid
                        ? "col-md-12 has-error"
                        : "col-md-12 has-success"
                  }
                >
                <label className="control-label">Tags</label>
                <div className="input-group col-md-12">
                  <textarea
                    type="text"
                    name="tags"
                    placeholder="Comma separated tags"
                    className="form-control"
                    value={this.state.formData.tags.value}
                    onChange={this.onChange}
                  />
                  <i
                    className={
                      !this.state.formData.tags.valid &&
                      this.state.formData.tags.touched
                        ? "form-control-feedback glyphicon glyphicon-remove"
                        : "form-control-feedback glyphicon glyphicon-ok"
                    }
                    data-bv-icon-for="tags"
                    style={{
                      display: this.state.formData.tags.touched
                        ? "block"
                        : "none"
                    }}
                  />
                  {!this.state.formData.tags.valid &&
                  this.state.formData.tags.touched ? (
                    <p className="text-danger has-error">
                      {"  "}
                      A tag is required
                    </p>
                  ) : null}
                </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-row">
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
                  <label className="control-label">Blog</label>
                  <div className="input-group col-md-12">
                    <textarea
                      type="text"
                      name="body"
                      placeholder="Blog entry"
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
                        Blog text is required
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-row">
              <div className="form-group">
                <div className="col-md-6">
                  <label htmlFor="title">Create Date:</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      name="createDate"
                      value={this.state.formData.createDate.value}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="title">Update Date:</label>
                  <div className="input-group">
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
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-actions" role="group">
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
                  !this.state.formData._id.value &&
                  !this.state.formData.title.touched &&
                  !this.state.formData.publisher.touched &&
                  !this.state.formData.body.touched &&
                  !this.state.formData.tags.touched &&
                  !this.state.formData.dateToPublish.touched &&
                  !this.state.formData.isActive.touched
                }
              >
                Cancel
              </button>
              {this.state.formData._id.value && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props.onDelete(this.state.formData)}
                >
                  Delete
                </button>
              )}
            </div>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}
export default BlogForm;
