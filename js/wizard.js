'use strict';

var fireballSize = 22,
  wizardSpeed = 3,
  wizardWidth = 70,
  getFireballSpeed = function (left) {
    return left ? 5 : 2;
  },
  getWizardHeight = function () {
    return 1.337 * wizardWidth;
  }

function getWizardX(width) {
  return (width - wizardWidth) / 2;
}
function getWizardY(height) {
  return (height / 3) * 2;
}