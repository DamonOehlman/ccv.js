# ccv.js

This is a port of the original [libccv](https://github.com/liuliu/ccv)
[JS library](https://github.com/liuliu/ccv/blob/unstable/js/ccv.js) into
a browserify friendly module.

Why am I doing this?  Well I'd like to see
[clmtrackr](https://github.com/auduno/clmtrackr) land in NPM and it requires
both `ccv` and `numeric` as dependencies.


[![NPM](https://nodei.co/npm/ccv.png)](https://nodei.co/npm/ccv/)

[![Build Status](https://travis-ci.org/DamonOehlman/ccv.js.png?branch=master)](https://travis-ci.org/DamonOehlman/ccv.js)

## Relationship with the Original Code

The code is licensed under the same
[BSD 3-clause](http://opensource.org/licenses/BSD-3-Clause) license but is
adapted from [Liu Liu's](https://github.com/liuliu) original work and thus
may contain errors that were not contained in the original library.  The
decision to refactor the code slightly was not made lightly, but was felt
necessary to fully embrace use of npm and supporting tools.

As far as I have understood, the original algorithms have been preserved.

## Port Progress

The following is a list of the functions contained within the original ccv
JS library and the progress with the refactor.
