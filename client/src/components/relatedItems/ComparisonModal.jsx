import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';


class ComparisonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.targetOverlay = document.getElementById('overlay');
    this.uniqueId = "comparison-modal-" + this.props.id;
    this.uniqueSearch ="#" + this.uniqueId;
    this.searchString = `[data-modal-target],${this.uniqueId}`;
    this.openModalButtons = document.querySelectorAll(this.searchString);
    this.openModalButtonsClick = this.openModalButtonsClick.bind(this);

  }

  openModal(modal){
    if (modal === null) {
      return;
    }
    modal.classList.add('active');
    this.targetOverlay.classList.add('active');
  }

  openModalButtonsClick() {
    console.log('open click');
    this.openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        this.openModal(modal);
      })
    })
  }


  render() {

    // const uniqueId = "comparison-modal-" + this.props.id;

    // console.log('unique id', uniqueId)

    const featuresArr = this.props.features;
    const overviewFeaturesArr = this.props.overviewIdFeatures;
    const newFeaturesArr = [...new Set([...featuresArr, ...overviewFeaturesArr])];


    const closeModalButtons = document.querySelectorAll('[data-modal-close]');


    const closeModal = (modal) => {
      if (modal === null) {
        return;
      }
      modal.classList.remove('active');
      targetOverlay.classList.remove('active');
    }

    // openModalButtons.forEach(button => {
    //   button.addEventListener('click', () => {
    //     const modal = document.querySelector(button.dataset.modalTarget);
    //     openModal(modal);
    //   })
    // })

    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.comparison-modal')
        closeModal(modal);
      })
    })


    return (

      <>

        <button data-modal-target={this.uniqueSearch} className="overlay" onClick={this.openModalButtonsClick}></button>

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
                       </div>}

              if (hasOverviewFeature && hasCompareFeature) {
                return <div className="features-compare" key={this.props.id.toString() + feature}>
                         <div className="left-check">✔️</div>{feature}<div className="right-check">✔️</div>
                       </div>}

              if (!hasOverviewFeature && hasCompareFeature) {
                return <div className="features-compare" key={this.props.id.toString() + feature}>
                         <div className="left-check"></div>{feature}<div className="right-check">✔️</div>
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
