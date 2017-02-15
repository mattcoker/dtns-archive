import Ember from 'ember';
import DateTimeFormatMixin from '../../../mixins/date-time-format';

export default Ember.Component.extend(DateTimeFormatMixin, {
  session: Ember.inject.service()
});
