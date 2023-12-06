<?php
    /** @var $guest ?\App\Model\Guest */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="guest[name]" value="<?= $guest ? $guest->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Opinion</label>
    <textarea id="content" name="guest[content]"><?= $guest? $guest->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
