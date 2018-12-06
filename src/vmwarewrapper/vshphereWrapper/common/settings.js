/*
 * This file contains a few configuration parameters used in the samples. The
 * values should be filled in with details related to the environment the
 * samples will be executed within. The host is the primary API service URL.
 * The username and password are used for the initial login to obtain an API
 * session ID. SSL is set to false to avoid requiring SSL certificates,
 * essentially TRUST ALL.  Host1/2 are IPs to host machines, used for adding
 * and removing hosts to a datacenter. Datacenter is the name of a datacenter,
 * most likely one that already exists within the environment samples are to
 * be executed in. Datastore and vmName can be used when creating VMs.
 */
module.exports = {
  host: 'https://192.168.1.48', //No default! Please provide a valid host URL.
  username: 'root', //username. No default! Please provide a value.
  password: 'VWvirtual1289', // password. No default! Please provide a value.
  ssl: false, // use strict ssl or not.. false allows you to accept all certs.
              // NOTE: SSL should be set to true in a production environment.
  host1: '',
  host2: '',
  hostUsername: 'master',
  hostPassword: 'wolfe1234',
  datacenter: '', // the name of the datacenter
  datastore: 'datastore1', // the name of a datastore
  vmName: 'master', // a name of a VM, used in some of the samples,
  isoName: '', // the name of the ISO to use as the OS when creating a VM
              // (e.g. [datastore1] hoton-minimal-1.0TP2.iso)
  cleanup: false // true to clean up any data a sample created, false to leave it
}
