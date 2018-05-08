import React from "react";
import JarvisWidget from "./widgets/JarvisWidget";
import * as contentService from "../services/content.service.js";
import PageHeader from "./PageHeader";
import WizardGrid from "./widgets/WidgetGrid";
import headerObject from "./../constants/page-header.js";
import {withRouter} from 'react-router-dom';

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
  }

  componentDidMount() {
    let kebabCasedTitleName = this.props.match.params.title
      .replace(/\s+/g, "-")
      .toLowerCase();
   contentService.kebabCasedTitle(kebabCasedTitleName).then(data => {
      this.setState({
        content: data.item
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWidgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>

          <ol className="breadcrumb">
            <li>Home</li>
            <li>Content</li>
          </ol>
        </div>

        <div id="content">
          <PageHeader
            pageHeaderName={headerObject.contentViewCrud.pageHeader}
            subtitle={this.state.content.title}
          />
          <WizardGrid>
            <div className="row">
              <article className="col-sm-12 col-md-12 col-lg-12">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-file" /> {this.state.content.title}
                    </span>
                  }
                >
                  <article
                    dangerouslySetInnerHTML={{ __html: this.state.content.text }}
                  />
                </JarvisWidget>
              </article>
            </div>
          </WizardGrid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ContentView);
