import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ComparisonModal extends Component {
  constructor(props) {
    super(props);
    this.overlay = React.createRef();
    this.parentModal = React.createRef();
    this.uniqueId = "comparison-modal-" + this.props.id;
    this.uniqueSearch = "#" + this.uniqueId;
    this.searchString = `[data-modal-target],${this.uniqueId}`;
  }

  componentDidMount() {

    const parentModalOpen = this.parentModal.current.querySelectorAll(this.searchString);

    parentModalOpen.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        this.openModal(modal);
      })
    })
  }


  openModal(modal) {
    if (modal === null) {
      return;
    }
    modal.classList.add('active');
    this.overlay.current.classList.add('active');
  }


  render() {


    const featuresArr = this.props.features;
    const overviewFeaturesArr = this.props.overviewIdFeatures;
    const newFeaturesArr = [...new Set([...featuresArr, ...overviewFeaturesArr])];


    const closeModalButtons = document.querySelectorAll('[data-modal-close]');

    const closeModal = (modal) => {
      if (modal === null) {
        return;
      }
      modal.classList.remove('active');
      this.overlay.current.classList.remove('active');
    }

    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.comparison-modal')
        closeModal(modal);
      })
    })


    return (

      <>

        <div className="parentModal" ref={this.parentModal}>

          <button data-modal-target={this.uniqueSearch} className="overlay" ref={this.overlay}></button>

          <div className="comparison-modal" id={this.uniqueId}>

            <div className="comparison-modal-header">
              <div className="comparison-modal-title">COMPARING</div>
              <button data-modal-close id={this.props.id} className="comparison-modal-close-button">&times;</button>
            </div>

            <div className="comparison-modal-header">
              <div className="comparison-overview-name">{this.props.overviewIdName}</div>
              <div className="comparison-current-item-name">{this.props.name}</div>
            </div>

            <div className="comparison-modal-body">

              {newFeaturesArr.map((feature) => {
                // left side is overview ID, right side is item ID
                let hasOverviewFeature = overviewFeaturesArr.indexOf(feature) !== -1;
                let hasCompareFeature = featuresArr.indexOf(feature) !== -1;

                if (hasOverviewFeature && !hasCompareFeature) {
                  return <div className="features-compare" key={this.props.id.toString() + feature}>
                    <div className="left-check">✔️</div>{feature}<div className="right-check"></div>
                  </div>
                }

                if (hasOverviewFeature && hasCompareFeature) {
                  return <div className="features-compare" key={this.props.id.toString() + feature}>
                    <div className="left-check">✔️</div>{feature}<div className="right-check">✔️</div>
                  </div>
                }

                if (!hasOverviewFeature && hasCompareFeature) {
                  return <div className="features-compare" key={this.props.id.toString() + feature}>
                    <div className="left-check"></div>{feature}<div className="right-check">✔️</div>
                  </div>
                }
              }
              )}

            </div>

          </div>

        </div>

      </>
    )

  }
}

ComparisonModal.propTypes = {
  id: PropTypes.number,
  overviewId: PropTypes.number,
  overviewIdFeatures: PropTypes.array,
  name: PropTypes.string,
  overviewIdName: PropTypes.string,
  features: PropTypes.array,
}

export default ComparisonModal;
