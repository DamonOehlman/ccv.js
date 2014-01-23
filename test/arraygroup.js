var arraygroup = require('../arraygroup-orig');
var test = require('tape');

// ref: https://github.com/liuliu/ccv/blob/unstable/test/functional/util.tests.c#L51
test('group array with is_equal function', function(t) {
  var input;
  var output;

  t.plan(13);

  // initiaise the input
  input = [1, 2, 2, 2, 5, 3, 4, 5]

  // perform the grouping
  output = arraygroup(input, function(a, b) {
    return a === b;
  }).index;

  //   REQUIRE_EQ(((int*)ccv_array_get(idx, 1))[0], ((int*)ccv_array_get(idx, 2))[0], "element 2, 3 should in the same group");
  t.equal(output[1], output[2], 'element 2, 3 should in the same group');

  //   REQUIRE_EQ(((int*)ccv_array_get(idx, 2))[0], ((int*)ccv_array_get(idx, 3))[0], "element 3, 4 should in the same group");
  t.equal(output[2], output[3], 'element 3, 4 should in the same group');

  //   REQUIRE_EQ(((int*)ccv_array_get(idx, 4))[0], ((int*)ccv_array_get(idx, 7))[0], "element 4, 8 should in the same group");
  t.equal(output[4], output[7], 'element 5, 8 should in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 0))[0], ((int*)ccv_array_get(idx, 1))[0], "element 1, 2 should not in the same group");
  t.notEqual(output[0], output[1], 'element 1, 2 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 0))[0], ((int*)ccv_array_get(idx, 4))[0], "element 1, 5 should not in the same group");
  t.notEqual(output[0], output[4], 'element 1, 5 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 0))[0], ((int*)ccv_array_get(idx, 5))[0], "element 1, 6 should not in the same group");
  t.notEqual(output[0], output[5], 'element 1, 6 should not be in the same group');
  
  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 0))[0], ((int*)ccv_array_get(idx, 6))[0], "element 1, 7 should not in the same group");
  t.notEqual(output[0], output[6], 'element 1, 7 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 1))[0], ((int*)ccv_array_get(idx, 4))[0], "element 2, 5 should not in the same group");
  t.notEqual(output[1], output[4], 'element 2, 5 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 1))[0], ((int*)ccv_array_get(idx, 5))[0], "element 2, 6 should not in the same group");
  t.notEqual(output[1], output[5], 'element 2, 6 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 1))[0], ((int*)ccv_array_get(idx, 6))[0], "element 2, 7 should not in the same group");
  t.notEqual(output[1], output[6], 'element 2, 7 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 4))[0], ((int*)ccv_array_get(idx, 5))[0], "element 5, 6 should not in the same group");
  t.notEqual(output[4], output[5], 'element 5, 6 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 4))[0], ((int*)ccv_array_get(idx, 6))[0], "element 5, 7 should not in the same group");
  t.notEqual(output[4], output[6], 'element 5, 7 should not be in the same group');

  //   REQUIRE_NOT_EQ(((int*)ccv_array_get(idx, 5))[0], ((int*)ccv_array_get(idx, 6))[0], "element 6, 7 should not in the same group");
  t.notEqual(output[5], output[6], 'element 6, 7 should not be in the same group');
});

