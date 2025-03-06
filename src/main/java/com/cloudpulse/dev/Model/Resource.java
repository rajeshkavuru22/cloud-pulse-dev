package com.cloudpulse.dev.Model;

public class Resource {
    private String name;
    private String assetType;
    private String project;
    private String displayName;
    private String location;
    private String createTime;
    private String parentFullResourceName;
    private String parentAssetType;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getParentFullResourceName() {
        return parentFullResourceName;
    }

    public void setParentFullResourceName(String parentFullResourceName) {
        this.parentFullResourceName = parentFullResourceName;
    }

    public String getParentAssetType() {
        return parentAssetType;
    }

    public void setParentAssetType(String parentAssetType) {
        this.parentAssetType = parentAssetType;
    }
}
