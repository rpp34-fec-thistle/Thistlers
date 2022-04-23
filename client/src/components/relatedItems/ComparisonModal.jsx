import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';


class ComparisonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    const featuresArr = this.props.features;
    const overviewFeaturesArr = this.props.overviewIdFeatures;
    const newFeaturesArr = [...new Set([...featuresArr, ...overviewFeaturesArr])];

    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');
    const targetOverlay = document.getElementById('overlay');

    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
      })
    })

    const openModal = (modal) => {
      if (modal === null) {
        return;
      }
      modal.classList.add('active');
      targetOverlay.classList.add('active');
    }

    const closeModal = (modal) => {
      if (modal === null) {
        return;
      }
      modal.classList.remove('active');
      targetOverlay.classList.remove('active');
    }

    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.comparison-modal')
        closeModal(modal);
      })
    })

    return (

      <>
        <button data-modal-target="#comparison-modal" className="overlay" onClick={() => this.props.clickModal(this.props.id)}></button>

        <div className="comparison-modal" id="comparison-modal">

          <div className="comparison-modal-header">
            <div className="comparison-modal-title">COMPARING</div>
            <button data-modal-close className="comparison-modal-close-button">&times;</button>
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
                          <div className="left-check">✔️</div>  {feature}  <div className="right-check"></div>
                       </div>}

              if (hasOverviewFeature && hasCompareFeature) {
                return <div className="features-compare" key={this.props.id.toString() + feature}>
                         <div className="left-check">✔️</div>  {feature}  <div className="right-check">✔️</div>
                       </div>}

              if (!hasOverviewFeature && hasCompareFeature) {
                return <div className="features-compare" key={this.props.id.toString() + feature}>
                         <div className="left-check"></div>   {feature}  <div className="right-check">✔️</div>
                        </div>}
              }
            )}

          </div>

        </div>

      </>
    )

  }
}

ComparisonModal.propTypes = {
  features: PropTypes.array,
  overviewId: PropTypes.number,
  overviewIdFeatures: PropTypes.array,
  overviewIdName: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  clickModal: PropTypes.func
}

export default ComparisonModal;
