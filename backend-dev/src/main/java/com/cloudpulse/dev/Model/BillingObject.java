package com.cloudpulse.dev.Model;

public class BillingObject {
    String projectID;
    String service ;
    String skuId ;
    String skuDescription;
    String usageAmount;
    String cost ;
    String billingMonth;
    String currency;

    public BillingObject(String projectID, String service , String skuId ,String skuDescription, String usageAmount, String cost , String currency, String billingMonth){
        this.projectID = projectID;
        this.service = service;
        this.skuId = skuId;
        this.skuDescription = skuDescription;
        this.usageAmount = usageAmount;
        this.cost = cost;
        this.currency = currency;
        this.billingMonth = billingMonth;
    }

    public String getProjectID() {
        return projectID;
    }

    public void setProjectID(String projectID) {
        this.projectID = projectID;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getSkuId() {
        return skuId;
    }

    public  void setSkuId(String skuId) {
        this.skuId = skuId;
    }

    public String getSkuDescription() { return skuDescription;}

    public void setSkuDescription(String skuDescription) {this.skuDescription = skuDescription;}

    public String getUsageAmount() {
        return usageAmount;
    }

    public  void setUsageAmount(String usageAmount) {
        this.usageAmount = usageAmount;
    }

    public  String getCost() {
        return cost;
    }

    public  void setCost(String cost) {
        this.cost = cost;
    }

    public  String getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(String billingMonth) {
        this.billingMonth = billingMonth;
    }

    public String getCurrency() {return currency;}

    public  void setCurrency(String invoice) {
        this.currency = currency;
    }



}
