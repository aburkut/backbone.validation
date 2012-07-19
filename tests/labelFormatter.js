buster.testCase('Label formatters', {
  "Attribute names on the model can be formatted in error messages using": {
    setUp: function() {
      var Model = Backbone.Model.extend({
        validation: {
          someAttribute: {
            required: true
          },
          some_attribute: {
            required: true
          }
        },

        labels: {
          someAttribute: 'Custom label'
        }
      });

      this.model = new Model();
      _.extend(this.model, Backbone.Validation.mixin);
    },

    tearDown: function() {
      // Reset to default formatter
      Backbone.Validation.configure({
        labelFormatter: 'sentenceCase'
      });
    },

    "no formatting": {
      setUp: function() {
        Backbone.Validation.configure({
          labelFormatter: 'none'
        });
      },

      "returns the attribute name": function(){
        assert.equals('someAttribute is required', this.model.preValidate('someAttribute', ''));
      }
    },

    "label formatting": {
      setUp: function() {
        Backbone.Validation.configure({
          labelFormatter: 'label'
        });
      },

      "looks up a label on the model": function(){
        assert.equals('Custom label is required', this.model.preValidate('someAttribute', ''));
      },

      "returns attribute name when label is not found": function(){
        assert.equals('some_attribute is required', this.model.preValidate('some_attribute', ''));
      }
    },

    "sentence formatting": {
      setUp: function() {
        Backbone.Validation.configure({
          labelFormatter: 'sentenceCase'
        });
      },

      "sentence cases camel cased attribute name": function(){
        assert.equals('Some attribute is required', this.model.preValidate('someAttribute', ''));
      },

      "sentence cases underscore named attribute name": function(){
        assert.equals('Some attribute is required', this.model.preValidate('some_attribute', ''));
      }
    }
  }
});