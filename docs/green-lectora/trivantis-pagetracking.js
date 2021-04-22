 function PageTrackingStub(){
	this.InitPageTracking = function () { return 0 };
	this.GetRangeStatus = function () { return 'notstarted' };
	this.GetPageStatus = function () { return 0 };
	this.SetRangeStatus = function () { return 0 };
	this.SetOverride = function () { return 0 };
	this.SetPageStatus = function () { return 0 };
	this.SavePageTracking = function () { return 0 };
}

var trivPageTracking = new PageTrackingStub();